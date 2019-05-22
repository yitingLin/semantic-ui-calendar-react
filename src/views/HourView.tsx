import * as React from 'react';

import BaseCalendarView, {
  BaseCalendarViewProps,
  BaseCalendarViewPropsNames,
  CalendarWithOptionalHeaderViewProps,
  CalendarWithOptionalHeaderViewPropsNames,
  SingleSelectionCalendarViewProps,
  SingleSelectionCalendarViewPropsNames,
} from './BaseCalendarView';
import Calendar from './Calendar';
import Body from './CalendarBody/Body';
import Header, { HeaderProps } from './CalendarHeader/Header';

import { findHTMLElement, getRestProps } from '../lib';

const HOUR_CALENDAR_ROW_WIDTH = 4;

// IMPORTANT: keep in sync with HourViewPropsNames
export type HourViewProps =
  BaseCalendarViewProps
  & SingleSelectionCalendarViewProps
  & CalendarWithOptionalHeaderViewProps;

export const HourViewPropsNames = [
  ...BaseCalendarViewPropsNames,
  ...SingleSelectionCalendarViewPropsNames,
  ...CalendarWithOptionalHeaderViewPropsNames,
];

class HourView extends BaseCalendarView<HourViewProps, {}> {
  public render() {
    const {
      values,
      hasHeader,
      onValueClick,
      onNextPageBtnClick,
      onPrevPageBtnClick,
      hasPrevPage,
      hasNextPage,
      onHeaderClick,
      disabledItemIndexes,
      activeItemIndex,
      currentHeadingValue,
      hoveredItemIndex,
      onCellHover,
      inline,
      localization,
    } = this.props;

    const headerProps: HeaderProps = {
      className: 'suicr-hour-view-header',
      onNextPageBtnClick,
      onPrevPageBtnClick,
      hasPrevPage,
      hasNextPage,
      onHeaderClick,
      title: currentHeadingValue,
      width: HOUR_CALENDAR_ROW_WIDTH,
      displayWeeks: false,
      localization,
    };

    const rest = getRestProps(this.props, HourViewPropsNames);

    return (
      <Calendar ref={(e) => this.calendarNode = findHTMLElement(e)} outlineOnFocus={inline} {...rest}>
        { hasHeader && <Header { ...headerProps } /> }
        <Body
          data={values}
          width={HOUR_CALENDAR_ROW_WIDTH}
          onCellClick={onValueClick}
          hovered={hoveredItemIndex}
          onCellHover={onCellHover}
          active={activeItemIndex}
          disabled={disabledItemIndexes} />
      </Calendar>
    );
  }
}

export default HourView;
