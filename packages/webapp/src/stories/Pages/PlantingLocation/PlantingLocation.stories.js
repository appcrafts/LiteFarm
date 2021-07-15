import React from 'react';
import decorators from '../config/decorators';
import PurePlantingLocation from '../../../components/Crop/PlantingLocation';

export default {
  title: 'Page/PlantingLocation',
  decorators: decorators,
  component: PurePlantingLocation,
};

const Template = (args) => <PurePlantingLocation {...args} />;

export const PlantingLocationPage = Template.bind({});
PlantingLocationPage.args = {
  selectedLocation: {},
  onContinue: () => {},
  onGoBack: () => {},
  onCancel: () => {},
  setSelectedLocation: () => {},
  useHookFormPersist: () => {},
  persistedFormData: { needs_transplant: 'true' },
  persistedPath: [],
};

export const PlantingLocationWild = Template.bind({});
PlantingLocationWild.args = {
  selectedLocation: {},
  onContinue: () => {},
  onGoBack: () => {},
  onCancel: () => {},
  setSelectedLocation: () => {},
  useHookFormPersist: () => {},
  persistedFormData: { wild_crop: 'true' },
  persistedPath: [],
};
