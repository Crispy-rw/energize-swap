
# Energize Swap Frontend

The Energize Swap Frontend is a user interface built using modern web technologies to interact with the Energize Swap Backend API. It provides a user-friendly interface for managing drivers, batteries, swap stations, and battery swaps.

## Features

- **Driver Management:** Register new drivers and view drivers information
- **Battery Management:** Add new batteries, track battery locations, and monitor battery status.
- **Swap Station Management:** Create and manage swap stations, view station details, and assign batteries to stations.
- **Battery Swap Operations:** Perform battery swaps, initiate battery movement, and track ongoing and completed swaps.

## Technologies Used

- **React:** The frontend is developed using the React library, providing a component-based architecture for building user interfaces.
- **Redux:** Redux is used for state management, enabling efficient data flow and synchronization with the backend API.
- **React Router:** React Router is utilized for client-side routing, allowing seamless navigation between different pages and components.
- **Fetch:** Fetch is used for making HTTP requests to the backend API, facilitating data retrieval and modification.
- **@mui/material:** Material UI is employed for styling and theming the frontend components, providing an aesthetic and responsive design.

## Installation and Setup

To set up the Energize Swap Frontend, follow these steps:

1. Clone the repository: `git clone https://github.com/your/repo.git`
2. Install the required dependencies: `yarn install`
3. Configure the backend API endpoint: Update the API endpoint in the configuration file (`src/config.js`) to match your backend server address.
4. Start the development server: `yarn start`

The frontend will be accessible at `http://localhost:5173`.

## Folder Structure

The frontend project follows a modular folder structure, allowing easy organization and maintenance of the codebase. Here's an overview of the main folders:

- `src/components`: Contains reusable UI components used throughout the application.
- `src/pages`: Contains the main application pages, each representing a specific route.
- `src/redux`: Includes Redux actions, reducers, and store configuration for managing application state.
- `src/services`: Contains service modules for interacting with the backend API.
- `src/configs`: Includes utility functions and helper modules used across the application.
- `src/routes`: Contains configuration for all pages routes

## Deployment

The Energize Swap Frontend can be deployed to various hosting platforms or integrated into existing web applications. It's recommended to build the production version of the frontend before deployment.

To build the production version, run: `yarn build`

This command will generate optimized and minified static files in the `build` directory. You can then deploy these files to a static file server or integrate them with your backend server.

## Contributing

Contributions to the Energize Swap Frontend project are welcome! If you encounter any issues or have suggestions for improvements, please create an issue or submit a pull request. Make sure to follow the project's coding style and guidelines.

## License

The Energize Swap Frontend is released under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute the code for both commercial and non-commercial purposes. See the `LICENSE` file for more details.

## Acknowledgments

This project was developed as part of the Energize Swap initiative to promote electric vehicle adoption and provide efficient battery swapping services. We extend our gratitude to all the contributors and supporters who have made this project possible.

For any inquiries or further information, please contact [nshimyumukizachristian@gmail.com].
