import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
import { fetchAllUsersAsync, selectUsers } from "./usersSlice";
import UsersCard from "./UsersCard";

const Users = () => {
  const navigate = useNavigate();
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllUsersAsync());
    };
    fetchData();
  }, [dispatch]);

  function onClick(id) {
    navigate(`/users/${id}/`);
  }
  return (
    <Container>
      <Grid container spacing={3} columns={8}>
        {users && users.length
          ? users.map((user) => (
              <Grid item xs={8} sm={4} md={2} key={user.id}>
                <UsersCard user={user} onClick={onClick} />
              </Grid>
            ))
          : null}
      </Grid>
    </Container>
  );
};

export default Users;
