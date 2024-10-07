import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (value: number) => void;
}

export const CustomPagination = ({ currentPage, totalPages, onPageChange }: CustomPaginationProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event)
    onPageChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        variant='outlined'
        shape='rounded'
        color='primary'
        sx={{
          '& .css-r93niq-MuiButtonBase-root-MuiPaginationItem-root': { color: 'white' },
          '& .Mui-selected': { color: 'white' },
          '& .MuiPaginationItem-page.Mui-selected': { borderColor: '#5138E9' },
          '& .MuiPaginationItem-ellipsis': { color: 'white' },
        }}
        className='flex justify-center text-white'
      />
    </Stack>
  );
};
