
# Energize Swap Backend API

The Energize Swap Backend API is a RESTful API designed to manage battery swapping operations for electric vehicles. It provides endpoints for creating and managing drivers, batteries, swap stations, and battery swaps.

## Features

- **Driver Management:** Register new drivers and retrieve driver information.
- **Battery Management:** Add batteries, track battery locations, and monitor battery status.
- **Swap Station Management:** Create and manage swap stations, including their locations and available batteries.
- **Battery Swap Operations:** Perform battery swaps by associating a driver with a battery and a swap station.

## Technologies Used

- **Python:** The backend is implemented in Python, utilizing the Flask framework.
- **SQLAlchemy:** The database is managed using SQLAlchemy, an Object-Relational Mapping (ORM) library.
- **MySql:** The default database is MySql, but it can be easily switched to other supported databases.
- **RESTful API:** The API follows RESTful principles, allowing easy integration with frontend and mobile applications.
- **Docker:** The project includes a Docker Compose configuration for easy deployment.

## Installation and Setup

To set up the Energize Swap Backend API, follow these steps:

1. Clone the repository: `git clone https://github.com/your/repo.git`
2. Install the required dependencies: `pip install -r requirements.txt`
3. Set up the database: `python manage.py db upgrade`
4. Start the development server: `python app.py`

The API will be accessible at `http://localhost:5000`.

## API ENDPOINTS

| Ressource URL                    | Methods | Description                                     | Authentication required | Role           |
| -------------------------------- | ------- | ----------------------------------------------- | ----------------------- | ---------------|
| /api/v1/batteries                | GET     | Get a list of all batteries                     | Yes                     | Admin          | 
| /api/v1/batteries/addbattery     | POST    | Create a new battery                            | Yes                     | Admin          |
| /api/v1/drivers                  | GET     | GET a list of drivers                           | Yes                     | Admin          |
| /api/v1/drivers/addriver         | POST    | Create a new driver                             | Yes                     | Admin          |
| /api/v1/stations                 | GET     | Get a list of stations                          | No                      | Admin          |
| /api/v1/stations/addstation      | POST    | Create a new Station                            | Yes                     | Admin          |
| /api/v1/stations/batteries       | GET     | Get all batteries of a specific stations        | Yes                     | Manager        |
| /api/v1/swaps                    | GET     | Get a list of all battery exchange              | Yes                     | Admin, Manager |
| /api/v1/swaps/addswap            | POST    | Create a new battery exchange                   | Yes                     | Manager        |
| /api/v1/swaps/stopswap/<swap_id> | PUT     | Modify/Edit a specific swap to finish it        | Yes                     | Manager        |
| /api/v1/swaps/totalswappedbattery| GET     | Get a list of total battery exchanged           | Yes                     | Manager, Admin |
| /api/v1/swaps/<swap_id>          | GET     | Get information of one battery exchange         | Yes                     | Manager        |
| /api/v1/movements/<serial_number>| POST    | Update the movement of an active battery        | Yes                     | Driver         |
| /api/v1/login                    | POST    | Authentication                                  | No                      |                |

## Deployment

The Energize Swap Backend API can be deployed to various environments, such as local servers, cloud platforms, or containerized environments. The project includes a Docker Compose configuration file that simplifies the deployment process.

To deploy using Docker Compose, follow these steps:

1. Install Docker and Docker Compose.
2. Build the Docker image: `docker-compose build`
3. Start the Docker containers: `docker-compose up -d`

The API will be accessible at `http://localhost:5000`.

## Contributing

Contributions to the Energize Swap Backend API project are welcome! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request. Make sure to follow the project's code style and guidelines.

## License

The Energize Swap Backend API is released under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute the code for both commercial and non-commercial purposes. See the `LICENSE` file for more details.

## Acknowledgments

This project was developed as part of the Energize Swap initiative to promote electric vehicle adoption and provide efficient battery swapping services. We would like to thank all the contributors and supporters who have made this project possible.

For any inquiries or further information, please contact [nshimyumukizachristian@gmail.com].