import React, { useState } from 'react';
import { Toolbar, Typography, Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { apiService } from '../services/apiService';
import { LoadingSpinner } from './LoadingSpinner';
import { useSnackbar } from 'notistack';  

interface DataTableToolbarProps {
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

export const DataTableToolbar: React.FC<DataTableToolbarProps> = ({ setData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newRecord, setNewRecord] = useState({
    companySigDate: '',
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: '',
    employeeSigDate: '',
    employeeSignatureName: '',
  });

  const { enqueueSnackbar } = useSnackbar(); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRecord({
      companySigDate: '',
      companySignatureName: '',
      documentName: '',
      documentStatus: '',
      documentType: '',
      employeeNumber: '',
      employeeSigDate: '',
      employeeSignatureName: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!newRecord.companySigDate || !newRecord.companySignatureName) {
      enqueueSnackbar('Пожалуйста, заполните все обязательные поля', { variant: 'warning' });
      return false;
    }
    return true;
  };

  const handleAddRecord = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const createdRecord = await apiService.createData(newRecord);
      setData((prevData) => [createdRecord, ...prevData]);
      handleClose();
    } catch (error) {
      console.error("Не удалось создать новую запись", error);
      enqueueSnackbar('Не удалось создать новую запись', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Таблица данных
        </Typography>
        <Tooltip title="Добавить новую запись">
          <IconButton color="primary" onClick={handleClickOpen}>
            <Add />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить новую запись</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Дата подписи компании"
            type="datetime-local"
            fullWidth
            name="companySigDate"
            value={newRecord.companySigDate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Имя подписавшего от компании"
            type="text"
            fullWidth
            name="companySignatureName"
            value={newRecord.companySignatureName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Название документа"
            type="text"
            fullWidth
            name="documentName"
            value={newRecord.documentName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Статус документа"
            type="text"
            fullWidth
            name="documentStatus"
            value={newRecord.documentStatus}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Тип документа"
            type="text"
            fullWidth
            name="documentType"
            value={newRecord.documentType}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Номер сотрудника"
            type="text"
            fullWidth
            name="employeeNumber"
            value={newRecord.employeeNumber}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Дата подписи сотрудника"
            type="datetime-local"
            fullWidth
            name="employeeSigDate"
            value={newRecord.employeeSigDate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Имя подписавшего сотрудника"
            type="text"
            fullWidth
            name="employeeSignatureName"
            value={newRecord.employeeSignatureName}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleAddRecord} color="primary" disabled={loading}>
            {loading ? <LoadingSpinner size={24} /> : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
