import { useRouter } from "next/router";
import { getFilteredEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import { Fragment } from "react";
import Button from "@/ui/button";

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <div style={{ height: "10rem" }}>
        <p
          style={{
            backgroundColor: "rebeccapurple",
            width: "60%",
            marginTop: "1rem",
            padding: "1rem",
            color: "white",
            borderRadius: "8px",
          }}
          className="center"
        >
          Invalid filter. Please adjust the values and try again!
        </p>
        <div className="center" style={{ marginTop: "2rem" }}>
          <Button link="/events">Show All events</Button>
        </div>
      </div>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div style={{ height: "10rem" }}>
        <p
          style={{
            backgroundColor: "rebeccapurple",
            width: "60%",
            marginTop: "1rem",
            padding: "1rem",
            color: "white",
            borderRadius: "8px",
          }}
          className="center"
        >
          No events found for the chosen filter!
        </p>
        <div className="center" style={{ marginTop: "2rem" }}>
          <Button link="/events">Show All events</Button>
        </div>
      </div>
    );
  }
  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
