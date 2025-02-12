import { ProjectType } from '@/types';
import React from 'react';
import { ProjectItem } from './ProjectItem';

export const ProjectList = () => {
    return (
        <section id="projects" className="pb-52 bg-white">
            <h2 className="text-[#444444] text-3xl font-semibold text-center mb-20 uppercase">
                See my projects!
            </h2>
            <ul>
                {projectList.map((projectData) => (
                    <ProjectItem key={projectData.id} {...projectData} />
                ))}
            </ul>
            <div className="w-full grid place-items-center mt-10">
                <button
                    data-aos="zoom-in"
                    className="w-fit shrink-0 px-14 py-5 rounded-full uppercase bg-[#2e2e2e] text-white font-medium hover:shadow-lg hover:shadow-[#7e7e7e] duration-300"
                >
                    Show More
                </button>
            </div>
        </section>
    );
};

const projectList: ProjectType[] = [
    {
        description: {
            'pt-br': '',
            en: 'Projeto desenvolvido para um cliente. Plugin para cadastro de consultas, exames e medicamentos. Inclui autenticação com login e senha, cadastro com ativação de conta por email, criação de assinaturas Premiums usando o sistema de pagamento digital do pagar.me e outras APIs externas',
        },
        id: 'eSUS PEC Plugin',
        index: 0,
        screenshots: [
            {
                name: 'Screenshot 2024-03-29 102345',
                url: 'https://firebasestorage.googleapis.com/v0/b/vh-portfolio.appspot.com/o/project-images%2FScreenshot%202024-03-29%20102345?alt=media&token=51d91dac-3094-4fcc-9804-26245ad59da4',
            },
            {
                name: 'tinywow_Screenshot 2024-03-29 102406_52174756.webp',
                url: 'https://firebasestorage.googleapis.com/v0/b/vh-portfolio.appspot.com/o/project-images%2Ftinywow_Screenshot%202024-03-29%20102406_52174756.webp?alt=media&token=54146510-54ba-4876-96ab-97cfc50a31b6',
            },
        ],
        technologies: ['react', 'javascript', 'docker'],
        title: 'eSUS PEC Plugin',
        createdAt: new Date().toISOString(),
    },
    {
        description: {
            'pt-br': '',
            en: 'Migow é uma rede social web com autenticação por login e senha, onde é possível criar / reagir / comentar postagens e comentários, personalizar perfil de usuário e muito mais. Seu backend é baseado em Microserviços e usa kafka para criação de notificações e registro de atividade de usuário. Também é integrado com o Firebase para permitir criação de chats e upload de media para posts',
        },
        id: 'Migow App',
        index: 1,
        screenshots: [
            {
                name: 'Screenshot 2024-10-08 095201',
                url: 'https://firebasestorage.googleapis.com/v0/b/vh-portfolio.appspot.com/o/project-images%2FScreenshot%202024-10-08%20095201?alt=media&token=73a37004-8db7-4aed-a503-b460b235311a',
            },
        ],
        technologies: ['react', 'javascript', 'docker'],
        title: 'Migow App',
        createdAt: new Date().toISOString(),
    },
    {
        description: {
            'pt-br': '',
            en: 'Aplicação web que permite o usuário cadastrar sua petshop ou buscar petshop cadastradas',
        },
        id: 'Pet Lovers',
        index: 2,
        screenshots: [
            {
                name: 'Screenshot 2024-03-29 103310',

                url: 'https://firebasestorage.googleapis.com/v0/b/vh-portfolio.appspot.com/o/project-images%2FScreenshot%202024-03-29%20103310?alt=media&token=491ddce2-acad-4aff-9487-3b08792e7a0b',
            },
            {
                name: 'Screenshot 2024-03-29 103325',

                url: 'https://firebasestorage.googleapis.com/v0/b/vh-portfolio.appspot.com/o/project-images%2FScreenshot%202024-03-29%20103325?alt=media&token=346b0e96-d400-4fb9-91d9-60e6832206f3',
            },
            {
                name: 'Screenshot 2024-03-29 103348',
                url: 'https://firebasestorage.googleapis.com/v0/b/vh-portfolio.appspot.com/o/project-images%2FScreenshot%202024-03-29%20103348?alt=media&token=6fe15ab2-e5cc-459b-8e57-a2605a4e1e59',
            },
        ],
        technologies: ['react', 'javascript', 'docker'],
        title: 'Pet Lovers',
        createdAt: new Date().toISOString(),
    },
];
