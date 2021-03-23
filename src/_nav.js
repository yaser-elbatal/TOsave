import React, { Component } from "react";

import { CIcon } from '@coreui/icons-react';



export default {
  items: [
    {
      name: "الصفحة الرئيسية",
      url: "/",
      icon: 'cui-home icons font-xl'
    },
    {
      name: "الفروع",
      url: "/branches",
      icon: 'fa fa-bank fa-10X'

    },
    {
      name: "التقارير",
      url: "/",
      icon: "fa fa-file-image-o fa-lg",
      children: [
        {
          name: "التقرير الشهري",
          url: "/",
          icon: "cui-calendar icons font-lg",
          children: [
            {
              name: " التقارير",
              url: "/monthlyReports",
              icon: "fa fa-info fa-lg",

            },
            {
              name: " الاحصائيات",
              url: "/monthlyStatistics",
              icon: "fa fa-bar-chart fa-2xl",
            },
            {
              name: " الاعدادات",
              url: "/monthlyCats",
              icon: 'cui-settings icons font-xl'
            }
          ]
        },
        {
          name: "تقارير الصيانة",
          url: "/",
          icon: "fa fa-cogs fa-lg",
          children: [
            {
              name: "  التقارير",
              url: "/maintainanceReports",
              icon: "fa fa-info fa-lg",
            },
            // {
            //   name: "  شركات الصيانه",
            //   url: "/maintainanceCompanies",
            //   icon: "fa fa-cog fa-lg"
            // },
            // {
            //   name: " الاحصائيات",
            //   url: "/maintainanceStatistics",
            //   icon: "fa fa-bar-chart fa-2xlg"
            // },

            // {
            //   name: "   الاعدادات ",
            //   url: "/maintainanceCats",
            //   icon: "cui-settings icons font-xl"
            // },
          ]
        },
        {
          name: "تقارير تقييم المخاطر  ",
          url: "/",
          icon: "fa fa-file-o fa-lg",
          children: [
            {
              name: " التقارير",
              url: "/risk",
              icon: "fa fa-info fa-lg"
            },

            {
              name: " الاحصائيات",
              url: "/RiskStatistic",
              icon: "fa fa-bar-chart fa-2xlg"
            },

            {
              name: " الاعدادات",
              url: "/Riskcategoris",
              icon: "cui-settings icons font-xl"
            }
          ]
        },
        {
          name: " الطواريء",
          url: "/EmergencyReport",
          icon: "fa fa-exchange fa-lg",
          children: [
            {
              name: " تقارير الطواريء",
              url: "/EmergencyReport",
              icon: "fa fa-info fa-lg"
            },
            {
              name: " احصائيات الطواريء",
              url: "/statisticsEmergancy",
              icon: "fa fa-bar-chart fa-2xlg"
            }]
        },
        {
          name: " التوعيه",
          url: "/Aware",
          icon: "fa fa-leaf fa-lg",
          children: [
            {
              name: " التوعيه",
              url: "/Aware",
              icon: "fa fa-info fa-lg"
            },
            {
              name: "  احصائيات التدريب",
              url: "/AwareStatistic",
              icon: "fa fa-bar-chart fa-2xlg"
            }]
        },

        {
          name: "   الحوادث",
          url: "/",
          icon: "fa fa-magnet fa-lg",
          children: [
            {
              name: " تقارير الحوادث",
              url: "/incident",
              icon: "fa fa-info fa-lg"
            },
            {
              name: " احصائيات الحوادث",
              url: "/statisticIncident",
              icon: "fa fa-bar-chart fa-2xlg"
            }],

        }
      ]
    },
    ,


    {
      name: " الدعم الفني",
      url: "/Tech",
      icon: "icon-user icons font-l"
    },

    {
      name: "مستخدمى النظام",
      url: "/users",
      icon: "icon-people icons font-l"
    },
    {
      name: "المدن",
      url: "/cities",
      icon: "icon-location-pin icons font-l"
    },

    {
      name: "تسجيل الخروج",
      url: "/logout",
      icon: "fa fa-sign-out"
    }
  ]
};

