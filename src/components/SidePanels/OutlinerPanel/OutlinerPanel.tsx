import { observer } from 'mobx-react';
import { FC, useCallback, useEffect, useState } from 'react';
import { Block, Elem } from '../../../utils/bem';
import { PanelBase, PanelProps } from '../PanelBase';
import { OutlinerTree } from './OutlinerTree';
import { ViewControls } from './ViewControls';
import './OutlinerPanel.styl';

interface OutlinerPanelProps extends PanelProps {
  regions: any;
}

const Outliner: FC<any> = ({ regions }) => {
  const [group, setGroup] = useState();
  const onOrderingChange = useCallback((value) => {
    regions.setSort(value);
  }, [regions]);

  const onGroupingChange = useCallback((value) => {
    regions.setGrouping(value);
    setGroup(value);
  }, [regions]);

  useEffect(() => {
    setGroup(regions.group);
  }, []);

  regions.setGrouping(group);

  return (
    <>
      <ViewControls
        grouping={regions.group}
        ordering={regions.sort}
        orderingDirection={regions.sortOrder}
        onOrderingChange={onOrderingChange}
        onGroupingChange={onGroupingChange}
      />
      {regions?.regions?.length > 0 ? (
        <OutlinerTree regions={regions} selectedKeys={regions.selection.keys} />
      ) : (
        <Elem name="empty">Regions not added</Elem>
      )}
    </>
  );
};

const OutlinerPanelComponent: FC<OutlinerPanelProps> = ({ regions, ...props }) => {
  const [group, setGroup] = useState();

  useEffect(() => {
    setGroup(regions.group);
  }, []);

  regions.setGrouping(group);

  return (
    <PanelBase {...props} name="outliner" title="Outliner">
      <Outliner regions={regions} />
    </PanelBase>
  );
};

const OutlinerComponentStyled: FC<OutlinerPanelProps> = ({ regions }) => {
  return (
    <Block  name="outliner">
      <Outliner regions={regions} />
    </Block>
  );
};

export const OutlinerComponent = observer(OutlinerComponentStyled);

export const OutlinerPanel = observer(OutlinerPanelComponent);
