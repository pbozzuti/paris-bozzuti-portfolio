import React from 'react'

export const metadata = {
  title: "Privacy Policy | Paris Bozzuti",
};

const page = () => {
  return (
    <main className='flex flex-col w-full px-[5%] pt-[16dvh] lg:pt-[18dvh] mb-10 lg:max-w-[800px]'>

      <h1 className='font-antique !text-[1.8rem] md:!text-[2.0rem] lg:!text-[2.0rem] text-center lg:text-left mb-[5%] lg:mb-0'>
        Privacy Policy
      </h1>

      <hr className='hidden lg:block w-[75px] border-1 m-0 mt-4 mb-8' />

      <p className='text-gray-500'>Last updated: November 19, 2026</p>

      <h2 className='!text-[1.3rem] mt-6 mb-2'>What this site collects from visitors</h2>
      <p>
        Nothing. This site has no accounts, sign-ins, forms or tracking cookies, and does not collect
        or store personal information about people who visit it.
      </p>

      <h2 className='!text-[1.3rem] mt-6 mb-2'>Health data shown on this site</h2>
      <p>
        The home page shows my own daily step count. It is read from my personal Google Health account
        using the Google Health API with read-only access to activity data. Only my own account is
        connected; the site never asks visitors to connect theirs.
      </p>
      <p>
        The step count is displayed as a single number and briefly cached so the site does not request it
        on every visit. It is not sold, shared with third parties, used for advertising, or used to train
        AI or machine learning models.
      </p>
      <p>
        This site&apos;s use of information received from Google APIs adheres to the{' '}
        <a className='underline' href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank">
          Google API Services User Data Policy
        </a>, including the Limited Use requirements.
      </p>

      <h2 className='!text-[1.3rem] mt-6 mb-2'>Other services shown on this site</h2>
      <p>
        The site also displays my own recent Spotify listening and my latest public GitHub commit,
        using those services&apos; APIs with my own accounts.
      </p>

      <h2 className='!text-[1.3rem] mt-6 mb-2'>Contact</h2>
      <p>
        Questions about this policy can be sent through the <a className='underline' href="/contact">contact page</a>.
      </p>

    </main>
  )
}

export default page
