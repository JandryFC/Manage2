
import React, { useState, useEffect } from "react";
const API_URL = "http://localhost:5000/";
const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY";

const ReportingUser = () => {

    return (
        <div>
            <div className="flex justify-between p-4">
                <div>
                    {/* Fecha inicio */}
                    <div className="flex items-center justify-center">
                        <div className="datepicker relative form-floating mb-3 xl:w-96">
                            <input type="text"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Select a date" />
                            <label htmlFor="fechadesde" className="text-gray-700">Desde</label>
                        </div>
                    </div>

                </div>
                <div>
                    {/* fecha final */}

                    <div class="flex items-center justify-center">
                        <div class="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                            <input type="text"
                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Select a date" data-mdb-toggle="datepicker" />
                            <label for="floatingInput" class="text-gray-700">Select a date</label>
                        </div>
                    </div>

                </div>
                <div>
                    {/* generar reporte */}
                    <button type="button" className="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out">Generar</button>
                </div>
            </div>
        </div>
    )
}

export default ReportingUser;