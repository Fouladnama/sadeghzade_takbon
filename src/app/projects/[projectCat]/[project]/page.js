"use client";
import ProjectDetail from "a/components/ProjectDetail/ProjectDetail";
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from "react";

export default function sub_project(props) {
    const [validURL, setValidURL] = useState(null);
    const [projectNum, setProjectNum] = useState(null);
    const [projects, setProjects] = useState(null);
    const [projectsEN, setProjectsEN] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [language, setLanguage] = useState(searchParams.get("lang"));

    useEffect(() => {
        if(props && (props.params.projectCat == 'data-analysis'))
            setValidURL("data-analysis");
        else if(props && (props.params.projectCat == 'data-minning'))
            setValidURL("data-minning");
        else if(props && (props.params.projectCat == 'needs-assessment'))
            setValidURL("needs-assessment");
        else if (props && (props.params.projectCat == 'market-research'))
            setValidURL("market-research");
        else if(props && (props.params.projectCat == 'simulation'))
            setValidURL("simulation");
        else if(props && (props.params.projectCat == 'scheduling'))
            setValidURL("scheduling");
        else
            setValidURL(false);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage && validURL) {
            let temp = localStorage.getItem('Projects');
            if (temp) {
                temp = JSON.parse(temp);
                setProjects({...temp});
            }
            else {
                router.push(`/projects?lang=${language}`);
            }

            temp = localStorage.getItem('ProjectsEN');
            if (temp) {
                temp = JSON.parse(temp);
                setProjectsEN({...temp});
            }
            else {
                router.push(`/projects?lang=${language}`);
            }
        }

        if (validURL != null && !validURL) {
            router.push(`/projects?lang=${language}`);
        }
    }, [validURL]);

    useEffect(() => {
        if (projects != null && validURL) {
            let temp = projects[validURL].projects.length;
            if (props.params.project <= temp)
                setProjectNum(props.params.project);
            else {
                setProjectNum(false);
                router.push(`/projects?lang=${language}`);
            }
        }
    }, [projects]);

    useEffect(() => {
        setLanguage(searchParams.get("lang"));
    }, []);

    return (
        <Fragment>
            {
                validURL != null && projects != null && projectNum != null &&
                (validURL && projectNum) ? <ProjectDetail details={projects[validURL].projects[projectNum - 1]} detailsEN={projectsEN[validURL].projects[projectNum - 1]} /> : <></>
            }
        </Fragment>
    )
}
