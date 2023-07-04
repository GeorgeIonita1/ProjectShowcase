import { Controller, Get, Post, Put, Delete, Req, Param, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    @Get()
    getAllProjects() {
        return this.projectsService.getAllProjects();
    }

    @Post('create')
    createProject(@Req() request: Request) {
        return this.projectsService.createProject(request.body);
    }

    @Post('imageupload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        return this.projectsService.uploadImage(file, res);
    }

    @Put(':id')
    editProject(@Req() request: Request, @Param('id') id: string) {
        return this.projectsService.editProject(request.body, id);
    }

    @Put('visibility/:id')
    setVisibility(@Req() request: Request, @Param('id') id: string) {
        return this.projectsService.setVisibility(request.body, id);
    }

    @Delete('delete/:id')
    deleteProject(@Param('id') id: string) {
        return this.projectsService.deleteProject(id);
    }
}
