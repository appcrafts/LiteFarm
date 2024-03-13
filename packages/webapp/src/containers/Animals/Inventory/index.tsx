/*
 *  Copyright 2024 LiteFarm.org
 *  This file is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */
import { useCallback, useMemo, useState } from 'react';
import PureAnimalInventory from '../../../components/Animals/Inventory';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import Cell from '../../../components/Table/Cell';
import { CellKind } from '../../../components/Table/types';
import useAnimalInventory from './useAnimalInventory';
import type { AnimalInventory } from './useAnimalInventory';
import ActionMenu from '../../../components/ActionMenu';
import KPI from './KPI';
import styles from './styles.module.scss';
import AnimalsFilter from '../AnimalsFilter';
import { useFilteredInventory } from './useFilteredInventory';

// TODO: LF-4087
const iconActions = [
  { label: 'a', icon: null, onClick: () => ({}) },
  { label: 'b', icon: null, onClick: () => ({}) },
  { label: 'c', icon: null, onClick: () => ({}) },
  { label: 'd', icon: null, onClick: () => ({}) },
];

interface AnimalInventoryProps {
  isCompactSideMenu: boolean;
}

function AnimalInventory({ isCompactSideMenu }: AnimalInventoryProps) {
  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([]);

  const { t } = useTranslation(['translation', 'animal', 'common']);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { inventory, isLoading } = useAnimalInventory();

  const filteredInventory = useFilteredInventory(inventory);

  const onTypeClick = useCallback(
    (typeId: string) => {
      setSelectedTypeIds((prevSelectedTypeIds) => {
        const isSelected = prevSelectedTypeIds.includes(typeId);
        const newSelectedTypeIds = isSelected
          ? prevSelectedTypeIds.filter((id) => typeId !== id)
          : [...prevSelectedTypeIds, typeId];

        return newSelectedTypeIds;
      });
    },
    [setSelectedTypeIds],
  );

  const animalsColumns = useMemo(
    () => [
      {
        id: 'identification',
        label: t('ANIMAL.ANIMAL_IDENTIFICATION').toLocaleUpperCase(),
        format: (d: AnimalInventory) => (
          <Cell
            kind={CellKind.ICON_TEXT}
            text={d.identification}
            icon={d.icon}
            iconBorder={!d.batch}
            subtext={isMobile ? `${d.type} / ${d.breed}` : null}
            highlightedText={d.batch ? d.count : null}
          />
        ),
      },
      {
        id: isMobile ? null : 'type',
        label: t('ANIMAL.ANIMAL_TYPE').toLocaleUpperCase(),
        format: (d: AnimalInventory) => <Cell kind={CellKind.PLAIN} text={d.type} />,
      },
      {
        id: isMobile ? null : 'breed',
        label: t('ANIMAL.ANIMAL_BREED').toLocaleUpperCase(),
        format: (d: AnimalInventory) => <Cell kind={CellKind.PLAIN} text={d.breed} />,
      },
      {
        id: isMobile ? null : 'groups',
        label: t('ANIMAL.ANIMAL_GROUPS').toLocaleUpperCase(),
        format: (d: AnimalInventory) => (
          <Cell
            kind={CellKind.HOVER_PILL_OVERFLOW}
            items={d.groups}
            noneText={t('NONE', { ns: 'common' })}
          />
        ),
        sortable: false,
      },
      {
        id: 'path',
        label: '',
        format: (d: AnimalInventory) => <Cell kind={CellKind.RIGHT_CHEVRON_LINK} path={d.path} />,
        columnProps: {
          style: { width: '40px', padding: `0 ${isMobile ? 8 : 12}px` },
        },
        sortable: false,
      },
    ],
    [t, isMobile],
  );

  return (
    !isLoading && (
      <>
        <KPI
          isCompactSideMenu={isCompactSideMenu}
          onTypeClick={onTypeClick}
          selectedTypeIds={selectedTypeIds}
        />
        <div className={styles.mainContent}>
          <AnimalsFilter />
          <PureAnimalInventory
            tableData={filteredInventory}
            animalsColumns={animalsColumns}
            theme={theme}
            isMobile={isMobile}
          />
          <ActionMenu
            headerLeftText={''}
            textActions={[]}
            iconActions={iconActions}
            classes={{
              root: isCompactSideMenu ? styles.withCompactSideMenu : styles.withExpandedSideMenu,
            }}
          />
        </div>
      </>
    )
  );
}

export default AnimalInventory;