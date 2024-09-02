import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ProjectCard from './components/ProjectCard';
import { ProjectType } from '@/types';

interface Props {
    projectArray: ProjectType[];
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
