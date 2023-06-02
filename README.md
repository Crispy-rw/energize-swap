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

This will start the backend, frontend, and database services defined in the `docker-compose.yml` file.

### 4. Access the Application

Once the containers are up and running, you can access the application in your web browser:

- Backend API: `http://localhost:5000/`
- Frontend: `http://localhost:5173/`

### 5. Stop the Containers

To stop the Docker containers, press `Ctrl + C` in the terminal where the containers are running.

Alternatively, you can run the following command in the project's root directory:

```bash
docker-compose down
```

This will stop and remove the containers, networks, and volumes created by Docker Compose.

That's it! You now have the project running using Docker.

Note: Make sure to customize the Docker Compose configuration (`docker-compose.yml`) according to your project's needs, such as environment variables, volumes, or additional services.

Please let me know if you need further assistance!