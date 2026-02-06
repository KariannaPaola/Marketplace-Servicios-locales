import File from '../models/files.models.js';

export const uploadImage = async (req, res) => {

  try {
    console.log(req.file)
    if (!req.file) {
      return res.status(400).json({ message: 'No se han subido archivos.' });
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/documents/${req.file.filename}`;
    const document = new File({
      sender_Id: req.user.id,   
      type: req.body.type,      
      files: [{
        filename: req.file.filename,
        path: req.file.path,
        type: req.file.mimetype,
        url: fileUrl 
      }]
    });         
    await document.save();
    res.json({ message: "Documentos subidos correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al subir los archivos.', error: error.message });
  }

}

export const readImage = async (req, res) => {
  const {id} =  req.params;
  const documents = await File.find({ sender_Id: id});
  res.json(documents);
}