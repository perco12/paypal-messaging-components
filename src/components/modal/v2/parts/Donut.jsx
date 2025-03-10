/** @jsx h */
import { h } from 'preact';

const Donut = ({
    strokeWidth = 5.8,
    strokeLinecap = 'round',
    cx = 21,
    cy = 21,
    radius = 15.91549430918954,
    radiusV4andV5 = 5.5,
    viewBox = `0 0 ${2 * cx} ${2 * cy}`,
    style = { fontSize: '0.375rem' },
    segmentStrokeWidth = 5.8,
    currentNum = 0,
    numOfPayments = 4,
    timeStamp,
    periodicPayment,
    qualifying,
    useV4Design,
    useV5Design
}) => {
    const percentage = (currentNum / numOfPayments) * 100;
    const segStrokeWidth = segmentStrokeWidth ?? strokeWidth;
    const strokeDasharray = `${percentage} ${100 - percentage}`;
    const isV4OrV5Design = useV4Design === 'true' || useV5Design === 'true';
    const isV5Design = useV5Design === 'true';

    const segments = (
        <circle
            cx={cx}
            cy={cy}
            r={isV4OrV5Design ? radiusV4andV5 : radius}
            className="donut__percent"
            stroke-dasharray={strokeDasharray}
            stroke-dashoffset={25}
        />
    );

    const isQualifying = qualifying === 'true';
    const isPi3 = numOfPayments === 3 ? 'donut__single_payment_line__3' : 'donut__single_payment_line';
    const isBelowNumOfPayments = currentNum < numOfPayments;

    return (
        <div
            className={`donut__single_payment ${
                isQualifying ? 'donut__qualifying_payment' : 'donut__non_qualifying_payment'
            } ${isV4OrV5Design && isBelowNumOfPayments ? isPi3 : ''}${
                isV4OrV5Design && currentNum === numOfPayments ? 'donut__single_payment_line__end' : ''
            }`}
        >
            <span className={`${isV5Design ? 'v5Design' : ''} svg`}>
                <svg aria-hidden viewBox={viewBox} className="donut" style={style} xmlns="http://www.w3.org/2000/svg">
                    <circle
                        cx={cx}
                        cy={cy}
                        r={radius}
                        fill="transparent"
                        className={isV4OrV5Design ? 'donut__background__line' : 'donut__background'}
                        stroke-width={strokeWidth}
                    />
                    <g
                        stroke-width={isV4OrV5Design ? 0 : segStrokeWidth}
                        fill={isV4OrV5Design ? '#545D68' : 'transparent'}
                        stroke-linecap={strokeLinecap}
                    >
                        {segments}
                    </g>
                    <text x={cx} y={cy} text-anchor="middle">
                        {isQualifying}
                    </text>
                </svg>
            </span>
            {/* eslint-disable-next-line jsx-a11y/aria-role */}
            <span aria-labelledby={`donut__payment__${currentNum} donut__timestamp__${currentNum}`} role="text">
                {isQualifying && periodicPayment !== '-' && (
                    <span
                        className={isV4OrV5Design ? 'donut__payment_v5' : 'donut__payment'}
                        id={`donut__payment__${currentNum}`}
                        aria-hidden="true"
                    >
                        {periodicPayment}
                    </span>
                )}
                <span
                    className={isV4OrV5Design ? 'donut__timestamp_v5' : 'donut__timestamp'}
                    id={`donut__timestamp__${currentNum}`}
                    aria-hidden="true"
                >
                    {timeStamp}
                </span>
            </span>
        </div>
    );
};

export default Donut;
