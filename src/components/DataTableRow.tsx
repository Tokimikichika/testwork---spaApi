import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, TextField } from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';
import { apiService } from '../services/apiService';
import { useSnackbar } from 'notistack';
import { isNotEmpty, isISODate } from '../utils/validationUtils'; // Импортируем методы валидации
import { formatDate } from '../utils/formatUtils'; // Импортируем функцию форматирования даты

interface DataTableRowProps {
  row: any;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

export const DataTableRow: React.FC<DataTableRowProps> = ({ row, setData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editRow, setEditRow] = useState(row);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      await apiService.deleteData(row.id);
      setData((prevData) => prevData.filter((item) => item.id !== row.id));
      enqueueSnackbar('Запись успешно удалена', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Не удалось удалить данные', { variant: 'error' });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditRow(row);
  };

  const handleSaveClick = async () => {
    if (!isNotEmpty(editRow.companySigDate) || !isISODate(editRow.companySigDate)) {
      enqueueSnackbar('Пожалуйста, введите корректную дату подписи компании', { variant: 'warning' });
      return;
    }
    try {
      await apiService.updateData(editRow.id, editRow);
      setData((prevData) => prevData.map((item) => (item.id === editRow.id ? editRow : item)));
      setIsEditing(false);
      enqueueSnackbar('Запись успешно обновлена', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Не удалось обновить данные', { variant: 'error' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditRow({
      ...editRow,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <TableRow>
      <TableCell>
        {isEditing ? (
          <TextField
            name="companySigDate"
            value={editRow.companySigDate}
            onChange={handleChange}
          />
        ) : (
          formatDate(row.companySigDate) 
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            name="companySignatureName"
            value={editRow.companySignatureName}
            onChange={handleChange}
          />
        ) : (
          row.companySignatureName
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            name="documentName"
            value={editRow.documentName}
            onChange={handleChange}
          />
        ) : (
          row.documentName
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            name="documentStatus"
            value={editRow.documentStatus}
            onChange={handleChange}
          />
        ) : (
          row.documentStatus
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            name="documentType"
            value={editRow.documentType}
            onChange={handleChange}
          />
        ) : (
          row.documentType
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            name="employeeNumber"
            value={editRow.employeeNumber}
            onChange={handleChange}
          />
        ) : (
          row.employeeNumber
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            name="employeeSigDate"
            value={editRow.employeeSigDate}
            onChange={handleChange}
          />
        ) : (
          formatDate(row.employeeSigDate) 
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            name="employeeSignatureName"
            value={editRow.employeeSignatureName}
            onChange={handleChange}
          />
        ) : (
          row.employeeSignatureName
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <>
            <IconButton onClick={handleSaveClick}>
              <Save />
            </IconButton>
            <IconButton onClick={handleCancelClick}>
              <Cancel />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={handleEditClick}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};
