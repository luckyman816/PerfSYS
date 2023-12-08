import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFactories } from 'actions/factory';
import { getCustomers } from 'actions/customer';
import { getOwners } from 'actions/owner';
import { getScoreByCustomer } from 'actions/order';
import { getScoreByFactory } from 'actions/order';
import { getScoreByOwner } from 'actions/order';
import { Grid, Button, IconButton, Tooltip } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MonthlyBarChart from './MonthlyBarChart';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';

const SatisticsPage = ({ getFactories, getCustomers, getOwners, getScoreByCustomer, getScoreByFactory, getScoreByOwner }) => {
  //----------------------Search key-------------------------//
  const [formData, setFormData] = useState({
    factory: '',
    customer: '',
    owner: ''
  });
  const { factory, customer, owner } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //------------------factory, customer and owner list for select component--------------------//
  const customers_state = useSelector((state) => state.customer.customers);
  const factories_state = useSelector((state) => state.factory.factories);
  const owners_state = useSelector((state) => state.owner.owners);
  const [customers, setCustomers] = React.useState(['']);
  const [factories, setFactories] = React.useState(['']);
  const [owners, setOwners] = React.useState(['']);
  React.useEffect(() => {
    getCustomers();
  }, [getCustomers]);
  React.useEffect(() => {
    setCustomers(customers_state);
  }, [customers_state]);
  React.useEffect(() => {
    getFactories();
  }, [getFactories]);
  React.useEffect(() => {
    setFactories(factories_state);
  }, [factories_state]);
  React.useEffect(() => {
    getOwners();
  }, [getOwners]);
  React.useEffect(() => {
    setOwners(owners_state);
  }, [owners_state]);
  //----------------------- customer analysis function------------------------//
  const score_customer_state = useSelector((state) => state.order.score_customer);
  const [average_qScore, setAverage_QScore] = useState(0);
  const [average_cScore, setAverage_CScore] = useState(0);
  const [average_pScore, setAverage_PScore] = useState(0);
  const handleClickCustomer = async (c) => {
    await getScoreByCustomer(c);
  };

  React.useEffect(() => {
    let sum_Q = 0,
      sum_C = 0,
      sum_P = 0,
      num = 0;
    Array.isArray(score_customer_state) &&
      score_customer_state.length > 0 &&
      score_customer_state?.map((score_customer_it) => {
        if (score_customer_it.qScore !== '') {
          sum_Q += Number(score_customer_it.qScore?.split('Q')[0]);
          sum_C += Number(score_customer_it.cScore?.split('C')[0]);
          sum_P += Number(score_customer_it.pScore?.split('P')[0]);
          num++;
        }
      });
    let caculateQScore = sum_Q == 0 ? 0 : Math.ceil(sum_Q / num);
    let caculateCScore = sum_C == 0 ? 0 : Math.ceil(sum_C / num);
    let caculatePScore = sum_P == 0 ? 0 : Math.ceil(sum_P / num);
    setAverage_QScore(caculateQScore);
    setAverage_CScore(caculateCScore);
    setAverage_PScore(caculatePScore);
  }, [getScoreByCustomer, score_customer_state]);

  console.log('-------average--------', average_qScore);
  //----------------------- factory analysis function------------------------//
  const score_factory_state = useSelector((state) => state.order.score_factory);
  const [average_qScore_f, setAverage_QScore_f] = useState(0);
  const [average_cScore_f, setAverage_CScore_f] = useState(0);
  const [average_pScore_f, setAverage_PScore_f] = useState(0);
  const handleClickFactory = async (f) => {
    await getScoreByFactory(f);
  };
  React.useEffect(() => {
    let sum_Q_f = 0,
      sum_C_f = 0,
      sum_P_f = 0,
      num_f = 0;
    Array.isArray(score_factory_state) &&
      score_factory_state.length > 0 &&
      score_factory_state?.map((score_factory_it) => {
        if (score_factory_it.qScore !== '') {
          sum_Q_f += Number(score_factory_it.qScore?.split('Q')[0]);
          sum_C_f += Number(score_factory_it.cScore?.split('C')[0]);
          sum_P_f += Number(score_factory_it.pScore?.split('P')[0]);
          num_f++;
        }
      });
    let caculateQScore_f = sum_Q_f == 0 ? 0 : Math.ceil(sum_Q_f / num_f);
    let caculateCScore_f = sum_C_f == 0 ? 0 : Math.ceil(sum_C_f / num_f);
    let caculatePScore_f = sum_P_f == 0 ? 0 : Math.ceil(sum_P_f / num_f);
    setAverage_QScore_f(caculateQScore_f);
    setAverage_CScore_f(caculateCScore_f);
    setAverage_PScore_f(caculatePScore_f);
  }, [getScoreByFactory, score_factory_state]);
  //----------------------- onwer analysis function------------------------//
  const score_owner_state = useSelector((state) => state.order.score_owner);
  const [average_qScore_o, setAverage_QScore_o] = useState(0);
  const [average_cScore_o, setAverage_CScore_o] = useState(0);
  const [average_pScore_o, setAverage_PScore_o] = useState(0);
  const handleClickOwner = async (o) => {
    await getScoreByOwner(o);
  };
  React.useEffect(() => {
    let sum_Q_o = 0,
      sum_C_o = 0,
      sum_P_o = 0,
      num_o = 0;
    Array.isArray(score_owner_state) &&
      score_owner_state.length > 0 &&
      score_owner_state?.map((score_owner_it) => {
        if (score_owner_it.qScore !== '') {
          sum_Q_o += Number(score_owner_it.qScore?.split('Q')[0]);
          sum_C_o += Number(score_owner_it.cScore?.split('C')[0]);
          sum_P_o += Number(score_owner_it.pScore?.split('P')[0]);
          num_o++;
        }
      });
    let caculateQScore_o = sum_Q_o == 0 ? 0 : Math.ceil(sum_Q_o / num_o);
    let caculateCScore_o = sum_C_o == 0 ? 0 : Math.ceil(sum_C_o / num_o);
    let caculatePScore_o = sum_P_o == 0 ? 0 : Math.ceil(sum_P_o / num_o);
    setAverage_QScore_o(caculateQScore_o);
    setAverage_CScore_o(caculateCScore_o);
    setAverage_PScore_o(caculatePScore_o);
  }, [getScoreByOwner, score_owner_state]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} marginTop="5px">
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
          <Grid item xs={12} md={3} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Factory</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="factory"
                value={factory}
                label="Select Factory"
                onChange={handleChange}
              >
                {factories.map((factory_it) => {
                  return (
                    <MenuItem id={factory_it._id} value={factory_it.factory}>
                      {factory_it.factory}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Customer</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="customer"
                value={customer}
                label="Select Customer"
                onChange={handleChange}
              >
                {customers.map((customer_it) => {
                  return (
                    <MenuItem id={customer_it._id} value={customer_it.customer}>
                      {customer_it.customer}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select owner</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="owner"
                value={owner}
                label="Select Customer"
                onChange={handleChange}
              >
                {owners.map((owner_it) => {
                  return (
                    <MenuItem id={owner_it._id} value={owner_it.owner}>
                      {owner_it.owner}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        
        
        <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
          <Grid item xs={12} md={3} lg={3}>
          {average_qScore_f}
            <Tooltip title="Analysis">
              <IconButton color="success" name="factoryBtn" onClick={() => handleClickFactory(factory)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <MonthlyBarChart qScore={average_qScore_f} cScore={average_cScore_f} pScore={average_pScore_f} />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
          {average_qScore}
            <Tooltip title="Analysis">
              <IconButton color="success" name="customerBtn" onClick={() => handleClickCustomer(customer)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <MonthlyBarChart  qScore={average_qScore} cScore={average_cScore} pScore={average_pScore}/>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Tooltip title="Analysis">
              <IconButton color="success"  name="ownerBtn" onClick={() => handleClickOwner(owner)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <MonthlyBarChart qScore={average_qScore_o} cScore={average_cScore_o} pScore={average_pScore_o} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
SatisticsPage.propTypes = {
  addOrder: PropTypes.func.isRequired,
  getFactories: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  getOwners: PropTypes.func.isRequired,
  getScoreByCustomer: PropTypes.func.isRequired,
  getScoreByFactory: PropTypes.func.isRequired,
  getScoreByOwner: PropTypes.func.isRequired
};
export default connect(null, { getFactories, getCustomers, getOwners, getScoreByCustomer, getScoreByFactory, getScoreByOwner })(SatisticsPage);
