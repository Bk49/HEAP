import HeadingOne from "../../components/common/heading/HeadingOne";
import { Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useLoaderData, useNavigate } from "react-router-dom";
import { convertCalendarDate } from "../../functions/convertDate";

const MySummary = () => {
    const { businessGrowthPlans } = useLoaderData();
    const navigate = useNavigate()

    return (
        <Fragment>
            <HeadingOne divider={true}>Summary</HeadingOne>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={businessGrowthPlans.map(
                    ({ planName, startDate, endDate, id }) => ({
                        title: planName,
                        start: convertCalendarDate(startDate),
                        end: convertCalendarDate(endDate),
                        id: id,
                    })
                )}
                eventClick={({ event: { _def } }) => navigate(`/edit-plan/${_def.publicId}`)}
            />
        </Fragment>
    );
};

export default MySummary;
