const navigation = {
    Categories: [
        { name: 'Category 1', href: '#' },
        { name: 'Category 2', href: '#' },
        { name: 'Category 3', href: '#' },
        { name: 'Category 4', href: '#' },
    ],
    Languages: [
        { name: 'Language 1', href: '#' },
        { name: 'Languages 2', href: '#' },
        { name: 'Languages 3', href: '#' },
        { name: 'Languages 4', href: '#' },
    ],
    Tags: [
        { name: 'Tag 1', href: '#' },
        { name: 'Tag 2', href: '#' },
        { name: 'Tag 3', href: '#' },

    ],

}

export default function Example() {
    return (
        <footer className="bg-white" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="grid grid-cols-1 gap-8 xl:col-span-2">
                        <div className="grid grid-cols-3 md:gap-10 sm:gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-600 tracking-wider uppercase">Category </h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {navigation.Categories.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-600 tracking-wider uppercase">Language</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {navigation.Languages.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-600 tracking-wider uppercase">Tag</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {navigation.Tags.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            Subscribe to our newsletter
                        </h3>
                        <p className="mt-4 text-base text-gray-500">
                            The latest news, articles, and resources, sent to your inbox weekly.
                        </p>
                        <form className="mt-4 sm:flex sm:max-w-md">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email-address"
                                id="email-address"
                                autoComplete="email"
                                required
                                className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400"
                                placeholder="Enter your email"
                            />
                            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </footer>
    )
}