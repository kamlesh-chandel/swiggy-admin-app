import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const FoodItems = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <Typography variant="h5">
        Manage Food Items - Restaurant ID: {id}
      </Typography>
    </Box>
  );
};

export default FoodItems;
