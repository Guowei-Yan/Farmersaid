import React from 'react';
import Home from './components/Home/Home';
import Regions from './components/Regions/Regions';
import Bpag from './components/Bpag/Bpag';
import Categories from './components/Categories/Categories';
import SafetyChecklist from './components/SafetyChecklist/SafetyChecklist';
import PriorityReport from './components/PriorityReport/PriorityReport';
import IconSource from './components/Footer/IconSource';
import Authorization from './components/Authorization/Authorization';
import ChecklistQuestionnaire from './components/ChecklistQuestionnaire/ChecklistQuestionnaire';

export const routes = [
    {
        exact: true,
        path: "/",
        render: () => <Home />
    },

    {
        exact: true,
        path: "/injury-by-regions",
        render: () => <Regions />
    },

    {
        exact: true,
        path: "/injury-by-bp-ag",
        render: () => <Bpag />
    },

    {
        exact: true,
        path: "/safety-measures",
        render: () => <Categories />
    },

    {
        exact: true,
        path: "/safety-measures/:category_id",
        render: () => <SafetyChecklist />
    },

    {
        exact: true,
        path: "/priority-report",
        render: () => <PriorityReport />
    },

    {
        exact: true,
        path: "/icon-source",
        render: () => <IconSource />
    },

    {
        exact: true,
        path: "/authorization",
        render: () => <Authorization />
    },

    {
        exact: true,
        path: "/checklist-questionnaire",
        render: () => <ChecklistQuestionnaire />
    },
]