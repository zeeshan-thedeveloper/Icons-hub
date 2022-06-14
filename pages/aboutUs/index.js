

import Layout from "../Components/layout";
const Index=() =>{
    return (
      <div className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="text-base max-w-prose mx-auto lg:max-w-none">
            <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase">Transactions</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What makes us different
            </p>
          </div>
          <div className=" text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
            <p className="text-lg text-gray-500">
              Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique
              pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor
              vitae ut. Amet vitae fames senectus vitae.
            </p>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div >
              <div className="prose prose-gray text-gray-500 mx-auto lg:max-w-none">
                <p>
                  Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem nibh vel, eget
                  pretium arcu vitae. Eros eu viverra donec ut volutpat donec laoreet quam urna.
                </p>
                <ul role="list">
                  <li>Quis elit egestas venenatis mattis dignissim.</li>
                  <li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
                  <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
                </ul>
                <p>
                  Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel ultricies. Vulputate aliquet
                  velit faucibus semper. Pellentesque in venenatis vestibulum consectetur nibh id. In id ut tempus
                  egestas. Enim sit aliquam nec, a. Morbi enim fermentum lacus in. Viverra.
                </p>
                <h3>We’re here to help</h3>
                <p>
                  Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam.
                  Montes, magna cursus nulla feugiat dignissim id lobortis amet. Laoreet sem est phasellus eu proin massa,
                  lectus. Diam rutrum posuere donec ultricies non morbi. Mi a platea auctor mi.
                </p>
              </div>
              <div className="mt-10 flex text-base max-w-prose mx-auto lg:max-w-none">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                  >
                    Contact sales
                  </a>
                </div>
                <div className="rounded-md shadow ml-4">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
            
         
          </div>
        </div>
      </div>
    )
  }
  export default Index;

  
Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
