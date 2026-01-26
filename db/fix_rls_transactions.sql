-- Enable RLS on transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Policy to allow Users to SEE their own transactions
CREATE POLICY "Users can view own transactions" 
ON public.transactions FOR SELECT 
USING (auth.uid() = user_id);

-- Policy to allow Users to INSERT their own transactions
CREATE POLICY "Users can insert own transactions" 
ON public.transactions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy to allow Users to UPDATE their own transactions
CREATE POLICY "Users can update own transactions" 
ON public.transactions FOR UPDATE 
USING (auth.uid() = user_id);

-- Policy to allow Users to DELETE their own transactions
CREATE POLICY "Users can delete own transactions" 
ON public.transactions FOR DELETE 
USING (auth.uid() = user_id);
