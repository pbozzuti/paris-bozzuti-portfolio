import React from 'react'

const GITHUB_USERNAME = "pbozzuti";

async function getLastCommit() {
    const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
    });

    if (!eventsRes.ok) return null;

    const events = await eventsRes.json();
    const pushEvent = events.find((e) => e.type === "PushEvent" && e.payload?.head);

    if (!pushEvent) return null;

    const commitRes = await fetch(
        `https://api.github.com/repos/${pushEvent.repo.name}/commits/${pushEvent.payload.head}`,
        { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 3600 } }
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
        <a
            href={commit.url}
            target="_blank"
            className='w-full max-w-[500px] px-6 py-4 bg-gray-100 border border-gray-200 rounded-lg shadow-lg flex flex-col gap-1 hover:scale-[1.02] transition-all duration-200 ease-in'
        >
            <p className='!font-[600] !text-[1.0rem] !m-0'>What I've been working on:</p>
            <p className='!font-[600]  text-gray-500 !text-[1.0rem] !m-0'>{commit.repo}</p>
            <p className='!text-[0.85rem] text-gray-500 !m-0'>{commit.message} · {new Date(commit.date).toLocaleDateString()} · {new Date(commit.date).toLocaleTimeString()}</p>
        </a>
    )
}

export default LastCommit
