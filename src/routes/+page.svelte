<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { slide, fade } from 'svelte/transition';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const accordionDatas = [
		{
			icon: 'gravity-ui:heart-fill',
			iconUncheck: 'gravity-ui:heart',
			summary: 'Nutrition',
			content: 'Learn about real nutrition science'
		},
		{
			icon: 'gravity-ui:heart-fill',
			iconUncheck: 'gravity-ui:heart',
			summary: 'Lifestyle',
			content: 'Learn about lifestyle'
		},
		{
			icon: 'gravity-ui:heart-fill',
			iconUncheck: 'gravity-ui:heart',
			summary: 'The rich dont want you to eat meat',
			content: 'Learn about why the rich dont want you to eat meat'
		},
		{
			icon: 'gravity-ui:heart-fill',
			iconUncheck: 'gravity-ui:heart',
			summary: 'Generational malnutrition and profit',
			content:
				'Learn about how generational manipulation and propaganda has turned health(or lack of) into a global scale money printing machine'
		}
	];

	const toastStore = getToastStore();
	let selected: number = 0;
</script>

<Accordion spacing="space-y-4  [&>div]:shadow-sm [&>div]:shadow-indigo-500/50" autocollapse>
	{#each accordionDatas as { icon, summary, content, iconUncheck }, index}
		<AccordionItem
			shadows={true}
			transitions={true}
			transitionIn={slide}
			transitionOut={slide}
			transitionInParams={{ duration: 200 }}
			transitionOutParams={{ duration: 200 }}
			on:toggle={() => (selected = index + 1)}
		>
			<svelte:fragment slot="lead">
				{#if index + 1 === selected}
					<Icon {icon} />
				{:else}
					<Icon icon={iconUncheck} />
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="summary"><span class=" font-semibold">{summary}</span></svelte:fragment
			>
			<svelte:fragment slot="content">
				<p>{content}</p>
				<button
					type="button"
					class="btn btn-sm variant-filled h-8"
					on:click={() => {
						toastStore.clear();
						toastStore.trigger({ message: 'Coming soon!', timeout: 1500 });
					}}
				>
					<span> Read</span>
					<span><Icon icon="gravity-ui:circle-chevron-right" width="16" height="16" /></span>
				</button>
			</svelte:fragment>
		</AccordionItem>
	{/each}
</Accordion>
