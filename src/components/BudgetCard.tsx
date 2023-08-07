import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { BudgetType } from '../utils/types';
import { Link } from 'react-router-dom';
import { calcBudgetTotalExpenses } from '../utils/helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
type BudgetCardPropsType = {
  budget: BudgetType;
  showDeleteButton?: boolean;
};

const BudgetCard = ({ budget, showDeleteButton }: BudgetCardPropsType) => {
  const totalExpenses = calcBudgetTotalExpenses(budget.id);
  console.log('budget total expense ', totalExpenses);
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <Card
        sx={{
          border: '3px solid',
          borderColor: 'primary.400',
          py: 1,
          px: 2,
          flexGrow: 1,
        }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          gap={4}
        >
          <Typography
            variant='h3'
            color='primary.dark'
            whiteSpace='nowrap'
            textTransform='uppercase'
          >
            {budget.name}
          </Typography>
          <Typography color='primary.light'>
            ${budget.amount} Budgeted
          </Typography>
        </Stack>
        <CardContent sx={{ px: 0 }}>
          <LinearProgress
            sx={{
              height: '1.5rem',
              mb: 0.4,
              borderRadius: '6px',
              px: 0,
              mx: 0,
            }}
            value={(totalExpenses / budget.amount) * 100}
            variant='determinate'
          />
          <Stack direction='row' justifyContent='space-between' gap={12}>
            <Typography color='primary.dark'>${totalExpenses} spent</Typography>
            <Typography color='GrayText'>
              ${budget.amount - totalExpenses} remaining
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          {showDeleteButton ? (
            <Button
              startIcon={<DeleteIcon />}
              color='error'
              variant='contained'
              sx={{ ml: 'auto' }}
            >
              Delete
            </Button>
          ) : (
            <Button
              color='primary'
              variant='outlined'
              LinkComponent='a'
              sx={{ ml: 'auto' }}
              component={Link}
              to={`/budget/${budget.id}`}
            >
              Budget details
            </Button>
          )}
        </CardActions>
      </Card>
      <Dialog open={openDialog}>
        <DialogTitle>Are you sure you want to delete this budget?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By deleting this budget; you will lose this budget information and
            the expenses associated with it permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BudgetCard;
