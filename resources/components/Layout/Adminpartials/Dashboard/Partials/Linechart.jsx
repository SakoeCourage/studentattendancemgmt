/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useEffect, useState, useMemo, useContext } from 'react'
import ReactApexChart from "react-apexcharts";
import { formatnumber } from '@/js/api/Util';

function LineChart({ dashboardData }) {


    const lineChart = useMemo(function () {
        return {
            series: Boolean(dashboardData?.line_chart?.length) && [...dashboardData?.line_chart],
            options: {
                chart: {
                    width: "100%",
                    height: 350,
                    type: "area",
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#0284c7', '#fb7185'],

                legend: {
                    show: false,
                },

                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "smooth",
                },

                yaxis: {

                    title: {
                        text: 'Attendance',
                    },

                    labels: {
                        style: {
                            fontSize: "14px",
                            fontWeight: 600,
                            colors: ["#0d9488"],
                        },
                    },
                },

                xaxis: {
                    labels: {
                        style: {
                            fontSize: "14px",
                            fontWeight: 600,
                            colors: [
                                "#8c8c8c",
                                "#8c8c8c",
                                "#8c8c8c",
                                "#8c8c8c",
                                "#8c8c8c",
                                "#8c8c8c",
                                "#8c8c8c",
                            ],
                        },
                    },
                    categories: ["sun", "mon", "tue", 'wed', 'thu', 'fri', 'sat']
                },

                tooltip: {
                    y: {
                        formatter: function (val) {
                            return formatnumber(val);
                        },
                    },
                },
            },
        };



    }, [dashboardData])




    return (
        <div className=' px-10 shadow-md p-10 border h-max min-w-[70%] card rounded-md border-gray-400/40'>
            <div className="linechart px-10">
                <div className='card-header'>
                    <div className=' text-info-900 font-bold tracking-3 antialiased' >Weekly Attendance graph</div>
                    <nav className="lastweek text-info-900 ">
                        A graph of current weeks attendance graph
                    </nav>
                </div>

            </div>

            <ReactApexChart
                className="full-width"
                options={lineChart.options}
                series={lineChart.series}
                type="area"
                height={350}
                width={"100%"}
            />
            <div className='flex items-center justify-center'>
                <nav className='flex items-center gap-7'>
                    <nav className='flex items-center gap-1'>
                        <nav className='w-[0.75rem] rounded-full aspect-square bg-[#0284c7]'>
                        </nav>
                        <nav>Attendace</nav>
                    </nav>

                </nav>
            </div>
        </div>
    );
}

export default LineChart;
