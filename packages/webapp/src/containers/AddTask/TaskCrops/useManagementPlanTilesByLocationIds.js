import { useSelector } from 'react-redux';
import {
  filterManagementPlansByLocationId,
  managementPlanEntitiesSelector,
} from '../../managementPlanSlice';
import { useMemo } from 'react';
import { taskEntitiesByManagementPlanIdSelector } from '../../taskSlice';
import { getTasksMinMaxDate } from '../../Task/getTasksMinMaxDate';
import produce from 'immer';

export const useManagementPlanTilesByLocationIds = (locationIds = [], managementPlanIds) => {
  const managementPlanEntities = useSelector(managementPlanEntitiesSelector);
  const managementPlans = managementPlanIds
    ? managementPlanIds.map((management_plan_id) => managementPlanEntities[management_plan_id])
    : Object.values(managementPlanEntities);

  const tasksByManagementPlanId = useSelector(taskEntitiesByManagementPlanIdSelector);
  return useMemo(
    () =>
      locationIds.reduce((managementPlansByLocationIds, { location_id }) => {
        const filteredManagementPlans = filterManagementPlansByLocationId(
          location_id,
          managementPlans,
        ).map((managementPlan) => {
          return produce(managementPlan, (managementPlan) => {
            const tasks = tasksByManagementPlanId[managementPlan.management_plan_id];
            managementPlan.firstTaskDate = getTasksMinMaxDate(tasks).startDate;
            managementPlan.status = managementPlan.start_date ? 'active' : 'planned';
          });
        });
        return filteredManagementPlans.length
          ? {
              ...managementPlansByLocationIds,
              [location_id]: filteredManagementPlans,
            }
          : { ...managementPlansByLocationIds };
      }, {}),
    [locationIds, managementPlans],
  );
};