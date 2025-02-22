<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	const accordionDatas = [
		{
			icon: 'gravity-ui:heart-fill',
			summary: 'Nutrition',
			content: 'Learn about real nutrition science'
		},
		{
			icon: 'gravity-ui:heart-fill',
			summary: 'Lifestyle',
			content: 'Learn about lifestyle'
		},
		{
			icon: 'gravity-ui:heart-fill',
			summary: 'The rich dont want you to eat meat',
			content: 'Learn about why the rich dont want you to eat meat'
		},
		{
			icon: 'gravity-ui:heart-fill',
			summary: 'Generational malnutrition and profit',
			content:
				'Learn about how generational manipulation and propaganda has turned health(or lack of) into a global scale money printing machine'
		}
	];

	const toastStore = getToastStore();
	let currentTile: number = 0;
</script>

<Accordion autocollapse>
	{#each accordionDatas as { icon, summary, content }}
		<AccordionItem
			transitions={true}
			transitionIn={slide}
			transitionOut={slide}
			transitionInParams={{ duration: 200 }}
			transitionOutParams={{ duration: 200 }}
		>
			<svelte:fragment slot="lead">
				<Icon {icon} />
			</svelte:fragment>
			<svelte:fragment slot="summary">{summary}</svelte:fragment>
			<svelte:fragment slot="content"
				>{content}
				<button
					type="button"
					class="btn btn-sm variant-filled"
					on:click={() => {
						toastStore.clear();
						toastStore.trigger({ message: 'Coming soon!', timeout: 1500 });
					}}
				>
					<span> Read</span>
					<span><Icon icon="gravity-ui:circle-chevron-right" width="16" height="16" /></span>
				</button></svelte:fragment
			>
		</AccordionItem>
	{/each}
</Accordion>
