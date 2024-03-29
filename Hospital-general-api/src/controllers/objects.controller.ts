import { Request, Response } from 'express';
import objectsService from '../services/objects.service';
import { handleHttp } from "../utils/error.handle";


const getObjects = async (req: Request, res: Response) => {
  try {
    const objects = await objectsService.getObjects();
    res.status(200).json(objects);
  } catch (error: any) {
    handleHttp(res, error, "Error getting objects");
  }
};

const createObject = async (req: Request, res: Response) => {
  try {
    const object = req.body;
    const newObject = await objectsService.createObject(object);
    res.status(201).json(newObject);
  } catch (error: any) {
    handleHttp(res, error, "Error creating object");
  }
};

const getObject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const object = await objectsService.getObject(id);
    res.status(200).json(object);
  } catch (error: any) {
    handleHttp(res, error, "Error getting object");
  }
};

const updateObject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const object = req.body;
    const updatedObject = await objectsService.updateObject(id, object);
    res.status(200).json(updatedObject);
  } catch (error: any) {
    handleHttp(res, error, "Error updating object");
  }
};

const deleteObject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedObject = await objectsService.deleteObject(id);
    res.status(200).json(deletedObject);
  } catch (error: any) {
    handleHttp(res, error, "Error deleting object");
  }
};

const getObjectbyResponsable = async (req: Request, res: Response) => {
  try {
    const responsable = req.params.responsable;

    if (!responsable || typeof responsable !== 'string') {
      return res.status(400).json({ error: 'Invalid responsable parameter' });
    }

    const objects = await objectsService.getObjectbyResponsable(responsable);

    res.status(200).json(objects);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error getting objects by responsable' });
  }
};

const getObjectsWithFieldFalse = async (req: Request, res: Response) => {
  try {
      const objects = await objectsService.findObjectsWithFieldFalse();
      res.status(200).json(objects);
  } catch (error) {
      console.error('Error al obtener objetos con campo "activo" igual a false:', error);
      res.status(500).json({ error: 'Error al obtener objetos' });
  }
};

const generateExcelbyResponsable = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const excelBuffer = await objectsService.generateExcelbyResponsable(id);

    // Establecer los encabezados de la respuesta para indicar que se enviará un archivo Excel
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="reporte_${id}.xlsx"`);
    
    // Enviar el contenido del archivo Excel como respuesta
    res.send(excelBuffer);

    console.log('Archivo Excel generado y enviado correctamente');
  } catch (error: any) {
    console.error('Error al generar y enviar el archivo Excel:', error.message);
    res.status(500).json({ error: 'Error al generar y enviar el archivo Excel' });
  }
};

const generateExcelbyCodes = async (req: Request, res: Response) => {
  try {
    const codes = req.body.codes;
    const excelBuffer = await objectsService.generateExcelbyCodes(codes);

    // Establecer los encabezados de la respuesta para indicar que se enviará un archivo Excel
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="reporte.xlsx"`);
    
    // Enviar el contenido del archivo Excel como respuesta
    res.send(excelBuffer);

    console.log('Archivo Excel generado y enviado correctamente');
  } catch (error: any) {
    console.error('Error al generar y enviar el archivo Excel:', error.message);
    res.status(500).json({ error: 'Error al generar y enviar el archivo Excel' });
  }
};

const getObjectsByCode = async (req: Request, res: Response) => {
  try {
    const codes = req.body.codes;

    if (!Array.isArray(codes) || codes.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty codes array' });
    }
    const objects = await objectsService.getObjectsByCode(codes);;
    return res.status(200).json(objects);
  } catch (error: any) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


const getObjectbyCode = async (req: Request, res: Response) => {
  try {
    const code = req.params.code;
    if (!code) {
      return res.status(400).json({ error: 'Code parameter is required' });
    }
    const objects = await objectsService.getObjectbyCode(code);
    return res.status(200).json(objects);
  } catch (error: any) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error getting object by code' });
  }
}







export default {
  getObjects,
  createObject,
  getObject,
  updateObject,
  deleteObject,
  getObjectbyResponsable,
  getObjectsWithFieldFalse,
  generateExcelbyResponsable,
  getObjectbyCode,
  getObjectsByCode,
  generateExcelbyCodes
};
