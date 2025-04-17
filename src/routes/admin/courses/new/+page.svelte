<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	let { data } = $props();

	const { form, delayed, enhance, constraints } = superForm(data.createForm, {
		onUpdated({ form }) {
			if (form.valid) invalidate('fetch:events');
		},
		onError({ result }) {
			console.log('error', result);
		},
	});

</script>

<div>
	<form action="?/create" method="POST" class="space-y-4 flex items-center gap-4">
		<div>
			<label for="title">ชื่อคอร์ส</label>
			<Input
				type="text"
				name="title"
				placeholder="Course Name"
				class="input"
				bind:value={$form.title}
				{...$constraints.title}
			/>
		</div>
		<div>
			<label for="title">ราคา</label>
			<Input
				type="number"
				name="price"
				class="input"
				bind:value={$form.price}
				{...$constraints.price}
			/>
		</div>
		<div>
			<label for="title">หน่วยกิต</label>
			<Input
				type="number"
				name="credit"
				class="input"
				bind:value={$form.credit}
				{...$constraints.credit}
			/>
		</div>      
        <Button type="submit" disabled={!delayed}>ยืนยัน</Button>
	</form>
</div>
