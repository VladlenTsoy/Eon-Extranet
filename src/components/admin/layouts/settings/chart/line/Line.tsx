import React from 'react';
import {ResponsiveLine} from '@nivo/line'

export const ChartLine = ({data, mouseEnter, linesColor}: any) => (
    <ResponsiveLine
        data={data}
        xScale={{type: 'point'}}
        yScale={{type: 'linear', stacked: true, min: 'auto', max: 'auto'}}
        // @ts-ignore
        curve="cardinal"
        // colors={{scheme: 'set1'}}
        pointSize={10}
        pointColor={{theme: 'background'}}
        pointBorderWidth={2}
        pointBorderColor={{from: 'serieColor'}}
        pointLabel="y"
        pointLabelYOffset={-12}
        crosshairType="x"
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={null}
        enableArea={false}
        enableCrosshair={false}
        sliceTooltip={()=>({})}
        useMesh={true}
        enableGridX={false}
        enableGridY={false}
        areaOpacity={0.7}
        onMouseMove={mouseEnter}
        colors={linesColor}
    />
);
