import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../configs";


const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {

        const token = localStorage.getItem('token');
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
  })

export const backendApis = createApi({
    reducerPath: "backendApis",
    baseQuery: baseQuery,
    tagTypes: ["Station", "Battery", "Driver", "Swap", "Movements" ],
    endpoints: (builder) => ({
        getAllDrivers: builder.query({
            query: () => "drivers",
            providesTags: ["Driver"]
        }),
        createDriver: builder.mutation({
            query: formData => ({
                url: "/drivers/addriver",
                method: "POST",
                body: formData,
                headers: {
                    Authorization: "application/json"
                }
            }),
            invalidatesTags: ["Driver"]
        }),
        createBattery: builder.mutation({
            query: formData => ({
                url: "batteries/addbattery",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Battery"]
        }),
        getAllBatteries: builder.query({
            query: () => "batteries",
            providesTags:["Battery"]
        }),
        getAllStations: builder.query({
            query: () => "stations",
            providesTags: ["Station"]
        }),
        createStation: builder.mutation({
            query: formData => ({
                url: "stations/addstation",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["Station"]
        }),
        getSwapHistory: builder.query({
            query: () => `swaps/totalswappedbattery`,
            providesTags: ["Swap"]
        }),
        getBatteryMovement: builder.query({
            query: () => 'movements',
            providesTags: ["Movements"]
        }),
        getStationBatteries: builder.query({
            query: () => `stations/batteries`,
            providesTags: ["Battery"]
        }),
        createSwap: builder.mutation({
           query: formData => ({
                url: 'swaps/addswap',
                method: 'POST',
                body: formData
           }),
           invalidatesTags: ["Swap"]
        }),
        getOngoingSwaps: builder.query({
            query: () => 'swaps',
            providesTags: ["Swap"]
        }),
        swapFinished: builder.mutation({
            query: id => ({
                url: `swaps/stopswap/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ["Swap"]
        })
    })
})



export const {
    useGetAllDriversQuery,
    useCreateDriverMutation,
    useGetAllBatteriesQuery,
    useCreateBatteryMutation,
    useGetAllStationsQuery,
    useCreateStationMutation,
    useGetSwapHistoryQuery,
    useGetBatteryMovementQuery,
    useGetStationBatteriesQuery,
    useCreateSwapMutation,
    useGetOngoingSwapsQuery,
    useSwapFinishedMutation
} = backendApis

export default backendApis.endpoints