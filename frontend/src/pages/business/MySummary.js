import HeadingOne from "../../components/common/heading/HeadingOne";
import { Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const MySummary = () => {
    return (
        <Fragment>
            <HeadingOne divider={true}>Summary</HeadingOne>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={[
                    {
                        title: "Event 1",
                        start: "2023-07-10",
                        end: "2023-08-11",
                        id:"abcefg"
                    },
                ]}
                eventClick={({event: {_def}}) => console.log(_def)}
            />
        </Fragment>
    );
};

export default MySummary;
