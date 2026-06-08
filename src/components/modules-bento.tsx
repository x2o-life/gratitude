import { BYOTContent, CampaignsContent, TemplatesContent, TrackContent } from "./modules-content";

export default function ModulesBento() {
    return (
        <div className="mt-12 w-full grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="bg-white md:bg-transparent row-span-3 md:row-start-1 flex min-h-100 md:min-h-80 flex-col rounded-lg shadow-sm md:shadow-none md:border p-4 hover:shadow-md transition-shadow duration-300">
                <div className="flex min-h-0 flex-1 items-center justify-center">
                    <CampaignsContent />
                </div>
                <div className="mt-4 shrink-0 flex flex-col gap-1">
                    <p className="text-lg font-medium font-bodoni-moda">Launch Campaigns in minutes</p>
                    <p className="text-sm text-gray-500">Create and publish loyalty experiences without lengthy setup or technical complexity.</p>
                </div>
            </div>

            <div className="bg-white md:bg-transparent row-span-3 md:row-start-2 flex min-h-100 md:min-h-80 flex-col rounded-lg shadow-sm md:shadow-none md:border p-4 hover:shadow-md transition-shadow duration-300">
                <div className="flex min-h-0 flex-1 items-center justify-center">
                    <TemplatesContent />
                </div>
                <div className="mt-4 shrink-0 flex flex-col gap-1">
                    <p className="text-lg font-medium font-bodoni-moda">Start with Ready-made Templates</p>
                    <p className="text-sm text-gray-500">Choose from proven campaign templates and customize them to fit your brand.</p>
                </div>
            </div>

            <div className="bg-white md:bg-transparent row-span-3 md:row-start-4 flex min-h-100 md:min-h-80 flex-col rounded-lg shadow-sm md:shadow-none md:border p-4 hover:shadow-md transition-shadow duration-300">
                <div className="flex min-h-0 flex-1 items-center justify-center">
                    <BYOTContent />
                </div>
                <div className="mt-4 shrink-0 flex flex-col gap-1">
                    <p className="text-lg font-medium font-bodoni-moda">Build Rewards Your Way</p>
                    <p className="text-sm text-gray-500">Combine points, tiers, referrals and perks to create a program that feels uniquely yours.</p>
                </div>
            </div>

            <div className="bg-white md:bg-transparent row-span-3 md:row-start-5 flex min-h-100 md:min-h-80 flex-col rounded-lg shadow-sm md:shadow-none md:border p-4 hover:shadow-md transition-shadow duration-300">
                <div className="flex min-h-0 flex-1 items-center justify-center">
                    <TrackContent />
                </div>
                <div className="mt-4 shrink-0 flex flex-col gap-1">
                    <p className="text-lg font-medium font-bodoni-moda">Adapt Campaigns As You Grow</p>
                    <p className="text-sm text-gray-500">Refine and expand your loyalty strategy as your audience, goals and business evolve.</p>
                </div>
            </div>
        </div>
    )
}