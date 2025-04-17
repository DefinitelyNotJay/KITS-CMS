<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import * as Table from '$lib/components/ui/table/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Eye, Icon } from 'lucide-svelte';

	export let data: PageData;

	console.log(data.courses);
</script>

<div>
	{#if data.courses.length > 0}
  <div class="rounded-md border">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[100px]">Code</Table.Head>
          <Table.Head>Title</Table.Head>
          <Table.Head>Description</Table.Head>
          <Table.Head class="text-right">Action</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each data.courses as course}
          <Table.Row class="cursor-pointer hover:bg-muted/50" on:click={() => goto(`/admin/course/${course.id}`)}>
            <Table.Cell class="font-medium">{course.code || '-'}</Table.Cell>
            <Table.Cell>{course.title}</Table.Cell>
            <Table.Cell>
              {course.description && course.description.length > 100
                ? course.description.slice(0, 100) + '...'
                : course.description || '-'}
            </Table.Cell>
            <Table.Cell class="text-right">
              <Button variant="ghost" size="sm" onclick={() => goto(`/admin/course/${course.id}`)}>
                <span class="sr-only">View</span>
                <Eye class="h-4 w-4" />
              </Button>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
{:else}
  <div class="flex justify-center items-center p-8 text-muted-foreground">
    <p>No courses available.</p>
  </div>
{/if}
</div>
