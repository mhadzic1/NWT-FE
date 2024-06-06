import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { slaData } from "../data/dummyData";
import WidgetSLA from "../components/widgetSLA";

const ServiceLevelAgreement = () => {
    return (
        <section className="p-3">
            <div className="flex gap-4">
                <div className="flex-[2_2_0%]">
                    <WidgetSLA />
                </div>
            </div>
        </section>
    );
};

export default ServiceLevelAgreement;
