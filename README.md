## Design and implement a system that will track the assets in motion. Battery Swap, telematics onboard. 
### How would you organize the data? What technologies would you use? Where would you see key risks?

To track assets in motion, including battery swaps and telematics onboard, the data can be organized as follows:

1. **Asset in motion Data**: This includes information about each asset, such as asset ID, type, current location, status, and associated battery details.
2. **Battery Data**: This includes battery information, such as battery ID, current charge level, health status, and history of swaps.
3. **Driver Data**: This includes driver details, such as driver ID, name, contact information, and driving history.
4. **Station Data**: This includes information about the battery swap stations, including station ID, location, available batteries, and swap history.

Technologies that was used to implement this system include:
- Backend Framework: Flask (Python) for developing the RESTful API and handling request/response logic.
- Relational Database: MySQL for storing and managing asset in motion, battery data, driver, and station data.
- frontend framework: ReactJs is a popular framework used to build modern SPAs

Key Risks:
- **Data Accuracy and Consistency**: Ensuring accurate and consistent real-time tracking data is crucial to maintain the reliability of the system.
- **Data Security**: Safeguarding sensitive asset information and implementing secure communication between devices, backend, and frontend components.
- **Scalability and Performance**: As the number of assets and data volume increases, the system should handle scalability and performance requirements effectively.

## How would you calculate the distance travelled by each driver? Total energy consumed by each driver. Total energy theoretically consumed by each driver.

To calculate the distance travelled by each driver and the total energy consumed by each driver, the following approach can be taken:

1. **Distance Calculation**:
- Utilize the GPS coordinates captured by the telematics devices on an asset.
- Apply distance calculation algorithms to calculate the distance between each set of consecutive GPS coordinates.
- Sum up the distances to calculate the total distance travelled by each driver.

2. **Energy Consumption Calculation**:
- Leverage the battery data and telematics data.
- Calculate the energy consumption based on factors such as vehicle speed, acceleration, and deceleration.
- Use energy consumption models specific to the vehicle type and battery characteristics.
- Sum up the energy consumption values to calculate the total energy consumed by each driver.

3. **Theoretical Energy Consumption Calculation**:
- Determine the theoretical energy consumption for each driver based on various factors, such as motocycle type, battery capacity, distance travelled, and energy efficiency.


## What's a good way to predict and optimize for how many batteries should be at a given station?

To predict and optimize the number of batteries at a given station, the following approach can be considered:

- Analyze historical data on battery swaps, station usage, and demands.
- Use statistical analysis techniques to identify peak demand periods and popular swap times
- Consider factors such as time of day, day of the week, seasonality, and any other relevant variables that affect battery demand.
- Incorporate external factors like events, holidays, and special occasions that may impact battery usage.

## Project Setup

To run the project using Docker, follow these steps:

### Prerequisites

Make sure you have the following installed on your system:
- Docker: [Download and install Docker](https://www.docker.com/get-started)

### 1. Clone the Repository

Clone the project repository from GitHub:

```bash
git clone https://github.com/Crispy-rw/energize-swap
```

### 2. Build the Docker Images

Navigate to the project's root directory:

```bash
cd energize-swap
```

Build the Docker images for the backend and frontend services:

```bash
docker-compose build
```

### 3. Start the Containers

Start the Docker containers using Docker Compose:

```bash
docker-compose up
```

#### 4. Setup the initial database:

```sh
# You can run this from a 2nd terminal. It will create a production database
docker-compose exec backend flask db reset
```

This will start the backend, frontend, and database services defined in the `docker-compose.yml` file.

### 5. Access the Application

Once the containers are up and running, you can access the application in your web browser:

- Backend API: `http://localhost:5000/`
- Frontend: `http://localhost:5173/`

### 6. Explore the Website

Certainly! Here's a step-by-step guide on how to navigate the website:

1. **Login as an Admin**: Visit the login page and use the following credentials to log in as an admin:
   - Email: admin@example.com
   - Password: password1

2. **Create Drivers**: As an admin, navigate to the Drivers section and create one or more drivers by providing their information.

3. **Create Swap Stations**: Still logged in as an admin, go to the Swap Stations section and create one or more swap stations by entering the necessary details.

4. **Create Batteries**: For each swap station, create batteries by specifying the station and providing relevant information for each battery.

5. **Logout**: Once you have created drivers, swap stations, and batteries, log out from the admin account.

6. **Login as a Manager**: Visit the login page again, but this time use the following credentials to log in as a manager:
   - Email: manager@example.com
   - Password: password2

7. **View Available Batteries**: As a manager, navigate to the batteries section to view the available batteries at your station.

8. **View Active Swaps**: In the Active Swaps section, you can see the ongoing swaps happening at your station.

9. **Create a New Battery Swap**: To initiate a new battery swap, go to the Battery Swap section and follow the steps to create a new swap by selecting the driver and the desired battery.

10. **Update Asset Movement**: When a battery swap is active, the driver should be able to update the movements of the asset. This can be done by making a PUT request to the endpoint `http://127.0.0.1:5000/api/v1/movements/<battery_serial_number>`. The driver should include the updated coordinates in the request payload, using the coordinates from the `coordinates.ini` file as a sample. This allows for accurate tracking and recording of the asset's movements throughout the swap process.

11. **Manage Active Swaps**: Any station manager can view the active swaps and, if the battery is deposited at their station for charging, stop the swap process.

12. **View Swap History**: 

   - **Manager**: In the Swap History section, station managers will be able to view the history of battery swaps that were picked up from their stations. This will provide them with a record of the swaps conducted at their station.

   - **Admin**: Administrators will have access to a comprehensive Swap History section where they can view the complete history of all battery swaps across all stations. This allows administrators to track and analyze the overall swap activities and monitor the performance of the entire system.

   The Swap History section will provide details such as swap ID, battery information, driver information, pickup station, deposit station (if applicable), start time, end time, and any other relevant information associated with each swap transaction such as distance covered.

### 7. Stop the Containers

To stop the Docker containers, press `Ctrl + C` in the terminal where the containers are running.

Alternatively, you can run the following command in the project's root directory:

```bash
docker-compose down
```

This will stop and remove the containers, networks, and volumes created by Docker Compose.

That's it! You now have the project running using Docker.

Note: Make sure to customize the Docker Compose configuration (`docker-compose.yml`) according to your project's needs, such as environment variables, volumes, or additional services.

Please let me know if you need further assistance!