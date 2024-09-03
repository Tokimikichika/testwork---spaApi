import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { apiService } from '../services/apiService';
import { DataTableToolbar } from './DataTableToolbar';
import { DataTableRow } from './DataTableRow';

export const DataTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getData();
        console.log("Получены данные:", result);

        if (Array.isArray(result)) {
          const filteredData = result.filter(row => row && Object.keys(row).length > 0);
          setData(filteredData);
        } else {
          console.error("Данные не являются массивом или равны null", result);
          setData([]);
        }
      } catch (error) {
        console.error("Не удалось получить данные", error);
        setError('Не удалось получить данные');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <TableContainer component={Paper}>
      <DataTableToolbar setData={setData} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Дата подписи компании</TableCell>
            <TableCell>Имя подписавшего</TableCell>
            <TableCell>Название документа</TableCell>
            <TableCell>Статус документа</TableCell>
            <TableCell>Тип документа</TableCell>
            <TableCell>Номер сотрудника</TableCell>
            <TableCell>Дата подписи сотрудника</TableCell>
            <TableCell>Имя подписавшего сотрудника</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <DataTableRow key={row.id || index} row={row} setData={setData} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
