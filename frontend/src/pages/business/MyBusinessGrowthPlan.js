import React, { useState } from 'react';
import { Grid, Paper } from "@mui/material";
import HeadingOne from "../../components/common/heading/HeadingOne";
import SortingButton from "../../components/common/button/SortingButton";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import TextIconButton from "../../components/common/button/TextIconButton";
import BusinessGrowthPlanCard from "../../components/business/card/BusinessGrowthPlanCard";

const MyBusinessGrowthPlan = () => {
    const navigate = useNavigate();
    const [sortingOrder, setSortingOrder] = useState("asc"); // Initialize to "asc"
    const [cards, setCards] = useState([
        {
            id: "64bdef6b6b5d992c941e82ca",
            planName: "MK 2",
            startDate: "25/07/2023",
            endDate: "27/07/2023",
            budget: 20000,
            priority: 5,
            planType: "MK",
        },
        {
            id: "64bdefaa6b5d992c941e82cb",
            planName: "Flyer Dist 1",
            startDate: "24/07/2023",
            endDate: "25/07/2023",
            budget: 10020,
            priority: 1,
            planType: "FD",
        },

        {
            id: "64bdefaa6b5d992c941e82cc",
            planName: "Flyer Dist 2",
            startDate: "01/12/2023",
            endDate: "16/12/2023",
            budget: 3003.43,
            priority: 3,
            planType: "OE",
        },
        {
            id: "64bdefaa6b5d992c941e82cd",
            planName: "Flyer Dist 1",
            startDate: "24/07/2023",
            endDate: "25/07/2023",
            budget: 10020,
            priority: 1,
            planType: "FD",
        },
    ]);
  
    const handleDelete = (id) => {
      const updatedCards = cards.filter((card) => card.id !== id);
      setCards(updatedCards);
    };
  
    const sortCards = (buttons, sortOrder) => {
      if (sortOrder === "asc") {

        return buttons.sort((a, b) => a.priority - b.priority);
      } else if (sortOrder === "desc") {

        return buttons.sort((a, b) => b.priority - a.priority);
      }

      return buttons;
    };
  
    const handleSort = () => {
      if (sortingOrder === "asc") {
        setSortingOrder("desc");
      } else if (sortingOrder === "desc") {
        setSortingOrder(null); 
      } else {
        setSortingOrder("asc"); 
      }
     
      const sortedCards = sortCards([...cards], sortingOrder);
      setCards(sortedCards);
    };
  
    return (
      <div>
        <HeadingOne> My Business Growth Plans </HeadingOne>
        <div style={{ marginTop: "1rem" }}></div>
        <Divider />
        <Grid
          sx={{
            width: "100%",
          }}
          container
          flexDirection="row-reverse"
          alignItems="end"
          padding="1rem"
          gap="1rem"
          justifyContent="flex-start"
        >
          <TextIconButton
            type="primary"
            onClick={() => navigate("/create-plan")}
          >
            Create
          </TextIconButton>
          <SortingButton
            sortingOrder={sortingOrder}
            onClick={handleSort}

          >
            {" "}
            PRIORITY{" "}
          </SortingButton>
          <SortingButton
            sortingOrder={sortingOrder}
            onClick={handleSort}
          >
            {" "}
            URGENCY{" "}
          </SortingButton>
        </Grid>
  
        <Grid container direction="column">
          {cards.map((card, index) => (
            <Grid key={index} item>
              <BusinessGrowthPlanCard
                card={card}
                onDelete={() => handleDelete(card.id)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };
 
  export default MyBusinessGrowthPlan;

