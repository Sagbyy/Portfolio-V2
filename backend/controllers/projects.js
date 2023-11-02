const Project = require("../models/Projects");
const fs = require("fs");

exports.createProject = (req, res, next) => {
    const projectObject = req.body;

    if (!req.file) {
        // Vérification si un fichier a été téléchargé
        return res
            .status(400)
            .json({ error: "Aucun fichier n'a été téléchargé." });
    }

    const project = new Project({
        ...projectObject,
        image: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
    });

    project
        .save()
        .then(() => res.status(201).json({ message: "Project save !" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteProject = (req, res, next) => {
    Project.findOne().then((project) => {
        const filename = project.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
            Project.deleteOne({ _id: req.params.id })
                .then(() => {
                    console.log(
                        `The project ${req.params.title} has been delete !`
                    );
                    res.status(200).json({ message: "Project delete ! " });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
        });
    });
};

exports.getOneProject = (req, res, next) => {
    Project.findOne({ _id: req.params.id })
        .then((project) => {
            res.status(200).json(project);
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.getProjects = (req, res, next) => {
    Project.find()
        .then((projects) => res.status(200).json(projects))
        .catch((error) => res.status(400).json({ error }));
};

