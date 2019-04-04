// @flow

import type { ServicedService } from '../components/Scheduler/types/Services';

export const SET_SELECTED_SERVICES: 'SET_SELECTED_SERVICES' = 'SET_SELECTED_SERVICES';

export const setSelectedServices = (selectedServices: ServicedService[]) => ({
    type: SET_SELECTED_SERVICES,
    selectedServices: selectedServices,
});
