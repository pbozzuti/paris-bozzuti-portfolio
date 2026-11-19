import React from 'react'
import { NOTCH, BORDER, notchPath } from './WorkCard'

const GITHUB_USERNAME = "pbozzuti";

async function getLastCommit() {
    const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        },
        next: { revalidate: 300 },
    });

    if (!eventsRes.ok) return null;

    const events = await eventsRes.json();
    const pushEvent = events.find((e) => e.type === "PushEvent" && e.payload?.head);

    if (!pushEvent) return null;

    const commitRes = await fetch(
        `https://api.github.com/repos/${pushEvent.repo.name}/commits/${pushEvent.payload.head}`,
        {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            },
            next: { revalidate: 3600 }
        }
    );

    if (!commitRes.ok) return null;

    const commit = await commitRes.json();

    return {
        repo: pushEvent.repo.name,
        message: commit.commit.message.split("\n")[0],
        date: commit.commit.author.date,
        url: commit.html_url,
    };
}

const LastCommit = async () => {

    const commit = await getLastCommit();

    if (!commit) return null;

    return (
        // notched outline like the work/project cards: gray outer shape, white inner shape inset by BORDER
        <a
            href={commit.url}
            target="_blank"
            className='group w-full max-w-[420px] bg-gray-300 hover:scale-[1.02] transition-all duration-200 ease-in'
            style={{padding: `${BORDER}px`, clipPath: notchPath(NOTCH)}}
        >
            <div
                className='h-full px-6 py-4 bg-white group-hover:bg-gray-50 transition-colors duration-200 flex items-center gap-4'
                style={{clipPath: notchPath(NOTCH - BORDER)}}
            >
                <img className='h-[2.5rem] flex-none dark:invert' src="/vectors/github.svg" alt="GitHub" />

                <div className='flex flex-col gap-1'>
                    <p className='!font-[600] !text-[1.0rem] !m-0'>What I've been working on:</p>
                    <p className='!font-[600]  text-gray-500 !text-[1.0rem] !m-0'>{commit.repo}</p>
                    <p className='!text-[0.85rem] text-gray-500 !m-0'>{commit.message} · {new Date(commit.date).toLocaleDateString()} · {new Date(commit.date).toLocaleTimeString()}</p>
                </div>
            </div>
        </a>
    )
}

export default LastCommit