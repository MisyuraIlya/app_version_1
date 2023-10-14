import React, { useEffect, useRef } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import moment from 'moment';
const Scheduler = ({ events, onDataUpdated, timeFormatState }) => {
  const schedulerContainer = useRef(null);
  
  const setHoursScaleFormat = (state) => {
    scheduler.config.hour_date = state ? '%H:%i' : '%g:%i %A';
    scheduler.templates.hour_scale = scheduler.date.date_to_str(scheduler.config.hour_date);
  };

  useEffect(() => {
    scheduler.skin = 'material';
    scheduler.config.header = [
      'day',
      'week',
      'month',
      'date',
      'prev',
      'today',
      'next'
    ];
    scheduler.config.hour_date = '%g:%i %A';
    scheduler.xy.scale_width = 80;
    const initSchedulerEvents = () => {
      if (scheduler._$initialized) {
        return;
      }

      scheduler.attachEvent('onEventAdded', (id, ev) => {
        if (onDataUpdated) {
          onDataUpdated('create', ev, id);
        }
      });

      scheduler.attachEvent('onEventChanged', (id, ev) => {
        if (onDataUpdated) {
          onDataUpdated('update', ev, id);
        }
      });

      scheduler.attachEvent('onEventDeleted', (id, ev) => {
        if (onDataUpdated) {
          onDataUpdated('delete', ev, id);
        }
      });

      scheduler._$initialized = true;
    };

    initSchedulerEvents();
    
    scheduler.init(schedulerContainer.current, moment());
    scheduler.clearAll();
    scheduler.parse(events);

  }, [events, onDataUpdated]);

  useEffect(() => {
    setHoursScaleFormat(timeFormatState);
    scheduler.render();
  }, [timeFormatState]);

  return (
    <div
      ref={schedulerContainer}
      style={{ width: '65%', height: '80%' }}
    ></div>
  );
};

export default Scheduler;
