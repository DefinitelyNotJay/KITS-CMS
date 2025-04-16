<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Content } from '$lib/components/ui/dropdown-menu';

	export let data: PageData;

	console.log(data.courses);
</script>

<div>
	{#if data.courses.length > 0}
		<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.courses as course}
				<Card.Root on:click={()=>alert("123")} class="cursor-pointer hover:bg-neutral-900">
					<Card.Header>
						<Card.Title class="text-2xl">{course.code}</Card.Title>
						<Card.Description class="text-xl">{course.title}</Card.Description>
						<!-- <img
							src={course.posterImage}
							alt={course.title}
							class="w-full h-32 object-cover rounded-t-md"
						/> -->
					</Card.Header>
					<Card.Content>
						<p>
							{course.description && course.description.length > 200
								? course.description.slice(0, 200) + '...'
								: course.description}
						</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</ul>
	{:else}
		<p>No courses available.</p>
	{/if}
</div>
