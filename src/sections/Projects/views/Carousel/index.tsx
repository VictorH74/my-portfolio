import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Project } from "../..";
import ProjectCard from "./components/ProjectCard";

interface Props {
  projectArray: Project[];
}

export default function CarouselView(props: Props) {
  return (
    <Carousel slide className="max-w-5xl m-auto">
      {props.projectArray.map((p, i) => (
        <Carousel.Item key={i}>
          <ProjectCard project={p} index={i} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}


