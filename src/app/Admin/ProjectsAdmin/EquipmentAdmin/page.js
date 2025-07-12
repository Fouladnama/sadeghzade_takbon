"use client";

import React, { useState, useEffect, useCallback } from "react";
import ApiConfig from "../../../../Api";
import ManagerProject from "../../../../components/ManagerProject/ManagerProject";

export default function EquipmentAdmin(){
    const [Equipment,setEquipment]=useState([]);

 return(
    <ManagerProject
     url="https://takbon.biz:3402/get_equipment"

    columns={[
            // {field:"name_fa",header:"نام"},
            {field:"image",header:" عکس"}


    ]}
    title="ابزار های پروژه"
    />

 );
}