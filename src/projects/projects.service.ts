import { Injectable } from '@nestjs/common';
import { db, bucket } from '../../firebase/config';

@Injectable()
export class ProjectsService {
    async getAllProjects() {
        const projectsRef = db.collection('projects');
        const snapshot = await projectsRef.get();
        const result = [];

        snapshot.forEach(doc => {
            result.push({id: doc.id, ...doc.data()})
        })
        return result;
    }

    async createProject(body) {
        const project = await db.collection('projects').add(body);
        const projectRef = db.collection('projects').doc(project.id);
        const doc = await projectRef.get();
        return { ...doc.data(), id: project.id };
    }

    async uploadImage(body, res) {
        let storageUrl;
        const fileName = Date.now() + '_' + body.originalname;
        const fileUpload = bucket.file(fileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
            contentType: body.mimetype,
            },
        });

        blobStream.on('error', (error) => {
            res.status(404).json({ message: 'Could not upload image'});
        });

        blobStream.on('finish', () => {
            storageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileUpload.name)}?alt=media`;
            res.status(200).json({ url: storageUrl });
        });

        blobStream.end(body.buffer);
    }
    
    async editProject(body, id) {
        const projectRef = db.collection('projects').doc(id);
        await  projectRef.update(body);
        return { ...body, id };
    }

    async setVisibility(body, id) {
        const projectRef = db.collection('projects').doc(id);
        await projectRef.update({isVisible: !body.visibility});
        return { id };
    }

    async deleteProject(id) {
        await db.collection('projects').doc(id).delete();
        return { id };
    }
}
