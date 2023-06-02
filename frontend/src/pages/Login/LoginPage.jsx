import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Controller, useForm } from "react-hook-form";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify"

import "./login.css";
import { BASE_URL } from "../../configs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTextField = {
  margin: "0.4rem 0.4rem 0rem 0rem",
  width: "300px",
};

const headerStyles = {
  width: "100%",
  backgroundColor: "#233044",
  color: "#eeeeee",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 7px 10px 7px",
  fontWeight: "bold",
};

const buttonStyle = {
  margin: "1rem 0rem",
  backgroundColor: "#233044",
  padding: "10px 7px 10px 7px",
};

function LoginPage() {
  const [value, setTab] = React.useState(0);
  const [stations, setStations] = React.useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  React.useEffect(() => {
    function getStations() {
      fetch(`${BASE_URL}stations`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((json) => {
          setStations(json?.data);
        })
        .catch((err) => {
          toast.error(err.message,{
            position: toast.POSITION.TOP_RIGHT
          })
        });
    }
    getStations();
  }, []);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    reset();
  };

  const onSubmit = (data) => {
    fetch(`${BASE_URL}login`, {
      method: "POST",
      body: JSON.stringify({ ...data }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        res.json().then( res => {
          toast.error(res?.error, {
            position: toast.POSITION.TOP_RIGHT
          });
        })
        throw new Error(res.statusText);
      })
      .then(({ token }) => {
        localStorage.setItem("token", token);
        if (data) {
          window.location.replace("/");
        }
      })
  };

  return (
    <>
      <section className="form-section">
        <div style={headerStyles}>
          <Typography fontSize={"20px"}>Authentication</Typography>
        </div>
        <Box sx={{ width: "100%", borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Admin" {...a11yProps(0)} />
            <Tab label="Manager" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-block">
              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                type="email"
                // required
                label="Email"
                {...register("email", {
                  required: "this field is required",
                  maxLength: { value: 20, message: "this field should be less that 20 characters" },
                  minLength: { value: 2, message: "this field should be more that 3 characters" },
                })}
              />
              <p role="alert">{errors?.email?.message}</p>
            </div>
            <div className="input-block">
              <TextField
                style={StyledTextField}
                variant="filled"
                id="outlined-password-input"
                label="Password"
                required
                type="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "this field is required",
                  maxLength: { value: 20, message: "this field should be less that 20 characters" },
                  minLength: { value: 3, message: "this field should be more that 3 characters" },
                })}
              />
                 <p role="alert">{errors?.password?.message}</p>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={buttonStyle}
              >
                Sign In
              </Button>
            </div>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-block">
              <TextField
                style={StyledTextField}
                required
                fullWidth
                type="email"
                variant="filled"
                label="Email"
                {...register("email", {
                  required: "this field is required",
                  maxLength: { value: 20, message: "this field should be less that 20 characters" },
                  minLength: { value: 3, message: "this field should be more that 3 characters" },
                })}
              />
                <p role="alert">{errors?.email?.message}</p>
            </div>
            <div className="input-block">
              <TextField
                style={StyledTextField}
                id="outlined-password-input"
                label="Password"
                type="password"
                variant="filled"
                required
                autoComplete="current-password"
                {...register("password", {
                  required: "this field is required",
                  maxLength: { value: 20, message: "this field should be less that 20 characters" },
                  minLength: { value: 3, message: "this field should be more that 3 characters" },
                })}
              />
                <p role="alert">{errors?.password?.message}</p>
            </div>
            <div>
              <Controller
                name="station"
                control={control}
                register={register}
                setValue={setValue}
                defaultValue={""}
                render={({ field }) => (
                  <TextField
                    style={StyledTextField}
                    variant="filled"
                    select
                    label="Select Station"
                    {...field}
                    required
                  >
                    <MenuItem disabled={true}>{"Select Station"}</MenuItem>
                    {stations &&
                      stations?.map((item, idx) => (
                        <MenuItem
                          key={idx}
                          value={item?.id}
                        >{`${item?.name} - ${item?.location}`}</MenuItem>
                      ))}
                  </TextField>
                )}
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={buttonStyle}
              >
                Sign In
              </Button>
            </div>
          </form>
        </TabPanel>
      </section>
    </>
  );
}

export default LoginPage;
